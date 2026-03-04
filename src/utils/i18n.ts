import { createContext, createElement, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import koTranslations from '../locales/ko';
import enTranslations from '../locales/en';
import zhTranslations from '../locales/zh';
import jaTranslations from '../locales/ja';
import esTranslations from '../locales/es';
import filTranslations from '../locales/fil';
import viTranslations from '../locales/vi';

export type Language = 'ko' | 'en' | 'zh' | 'ja' | 'es' | 'fil' | 'vi';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export const languages: LanguageOption[] = [
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fil', name: 'Filipino', nativeName: 'Filipino' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
];

const translations: Record<Language, any> = {
  ko: koTranslations,
  en: enTranslations,
  zh: zhTranslations,
  ja: jaTranslations,
  es: esTranslations,
  fil: filTranslations,
  vi: viTranslations,
};

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'ko';
  }

  const stored = localStorage.getItem('language') as Language;
  return stored && languages.some((lang) => lang.code === stored) ? stored : 'ko';
}

function getTranslationValue(language: Language, key: string): any {
  const keys = key.split('.');
  let value: any = translations[language];

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }

  return value !== undefined ? value : key;
}

interface TranslationContextValue {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => any;
}

const TranslationContext = createContext<TranslationContextValue | null>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', currentLanguage);
    }
  }, [currentLanguage]);

  const value = useMemo<TranslationContextValue>(
    () => ({
      currentLanguage,
      setLanguage: setCurrentLanguage,
      t: (key: string) => getTranslationValue(currentLanguage, key),
    }),
    [currentLanguage]
  );

  return createElement(TranslationContext.Provider, { value }, children);
}

export function useTranslation() {
  const context = useContext(TranslationContext);

  // Rules of Hooks: hooks는 항상 최상단에서 호출해야 함 → early return 이전에 선언
  // Provider 없이 단독 사용될 때를 위한 독립 상태 (fallback)
  const [fallbackLanguage, setFallbackLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    // Provider가 없을 때만 독립적으로 localStorage에 저장
    if (!context && typeof window !== 'undefined') {
      localStorage.setItem('language', fallbackLanguage);
    }
  }, [context, fallbackLanguage]);

  // TranslationProvider 안에서 호출된 경우 → Context 값을 우선 사용
  if (context) {
    return {
      ...context,
      languages,
    };
  }

  // Provider 없이 단독으로 사용된 경우 → fallback 독립 상태 반환
  return {
    t: (key: string): any => getTranslationValue(fallbackLanguage, key),
    currentLanguage: fallbackLanguage,
    setLanguage: setFallbackLanguage,
    languages,
  };
}
