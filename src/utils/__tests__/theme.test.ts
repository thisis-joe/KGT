// theme 유틸리티 테스트
// ThemeProvider와 useTheme 훅의 동작 검증

import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { createElement } from 'react';
import { ThemeProvider, useTheme } from '../theme';

// localStorage 및 document.documentElement 클래스 초기화
beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

// Provider 래퍼 팩토리
const makeWrapper = () => {
  return ({ children }: { children: React.ReactNode }) =>
    createElement(ThemeProvider, null, children);
};

describe('useTheme', () => {
  it('Provider 없이 호출하면 에러를 던져야 한다', () => {
    // useTheme은 ThemeProvider 밖에서 호출 시 throw
    expect(() => renderHook(() => useTheme())).toThrow('useTheme must be used within a ThemeProvider');
  });

  it('기본 테마는 light이어야 한다 (localStorage 미설정 시)', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: makeWrapper() });
    expect(result.current.theme).toBe('light');
    expect(result.current.isDark).toBe(false);
  });

  it('toggleTheme 호출 시 light → dark로 전환되어야 한다', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: makeWrapper() });
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });

  it('dark 테마로 전환 시 document.documentElement에 dark 클래스가 추가되어야 한다', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: makeWrapper() });
    act(() => {
      result.current.toggleTheme();
    });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('light로 복귀 시 dark 클래스가 제거되어야 한다', () => {
    localStorage.setItem('theme', 'dark'); // dark로 시작
    const { result } = renderHook(() => useTheme(), { wrapper: makeWrapper() });
    act(() => {
      result.current.toggleTheme(); // dark → light
    });
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('테마 변경 시 localStorage에 저장되어야 한다', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: makeWrapper() });
    act(() => {
      result.current.setTheme('dark');
    });
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('localStorage에 저장된 dark 테마로 초기화되어야 한다', () => {
    localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useTheme(), { wrapper: makeWrapper() });
    expect(result.current.theme).toBe('dark');
    expect(result.current.isDark).toBe(true);
  });
});
