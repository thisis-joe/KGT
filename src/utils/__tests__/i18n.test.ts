// i18n 유틸리티 테스트
// TranslationProvider와 useTranslation 훅의 동작 검증

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { createElement } from 'react';
import { TranslationProvider, useTranslation } from '../i18n';

// localStorage 초기화 - 테스트 간 격리
beforeEach(() => {
  localStorage.clear();
});

// Provider 래퍼 팩토리 - renderHook에 전달할 wrapper 생성
const makeWrapper = () => {
  return ({ children }: { children: React.ReactNode }) =>
    createElement(TranslationProvider, null, children);
};

describe('useTranslation', () => {
  it('기본 언어는 ko이어야 한다', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: makeWrapper() });
    expect(result.current.currentLanguage).toBe('ko');
  });

  it('ko 언어로 nav.company 번역이 반환되어야 한다', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: makeWrapper() });
    // ko 번역: "회사소개"
    expect(result.current.t('nav.company')).toBe('회사소개');
  });

  it('언어를 en으로 변경하면 영어 번역을 반환해야 한다', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: makeWrapper() });
    act(() => {
      result.current.setLanguage('en');
    });
    expect(result.current.currentLanguage).toBe('en');
    expect(result.current.t('nav.company')).toBe('Company');
  });

  it('존재하지 않는 키는 키 문자열 자체를 반환해야 한다', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: makeWrapper() });
    expect(result.current.t('nonexistent.key')).toBe('nonexistent.key');
  });

  it('언어 변경 시 localStorage에 저장되어야 한다', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: makeWrapper() });
    act(() => {
      result.current.setLanguage('ja');
    });
    expect(localStorage.getItem('language')).toBe('ja');
  });

  it('languages 배열은 7개 언어를 포함해야 한다', () => {
    const { result } = renderHook(() => useTranslation(), { wrapper: makeWrapper() });
    expect(result.current.languages).toHaveLength(7);
    // 지원 언어 코드 검증
    const codes = result.current.languages.map((l) => l.code);
    expect(codes).toEqual(['ko', 'en', 'zh', 'ja', 'es', 'fil', 'vi']);
  });

  it('localStorage에 저장된 언어로 초기화되어야 한다', () => {
    localStorage.setItem('language', 'zh');
    const { result } = renderHook(() => useTranslation(), { wrapper: makeWrapper() });
    expect(result.current.currentLanguage).toBe('zh');
  });
});
