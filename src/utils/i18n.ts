import { useState, useEffect } from 'react';
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

export function useTranslation() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('language') as Language;
      return stored && languages.some(l => l.code === stored) ? stored : 'ko';
    }
    return 'ko';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', currentLanguage);
    }
  }, [currentLanguage]);

  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value !== undefined ? value : key;
  };

  return {
    t,
    currentLanguage,
    setLanguage: setCurrentLanguage,
    languages,
  };
}