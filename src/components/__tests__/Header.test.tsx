// Header 컴포넌트 테스트
// 다크모드 토글, 언어 선택기, 네비게이션 렌더링 검증

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../Header';
import { ThemeProvider } from '../../utils/theme';
import { TranslationProvider } from '../../utils/i18n';

// localStorage 초기화
beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

// Header는 ThemeProvider + TranslationProvider + Router 모두 필요
const renderHeader = () => {
  return render(
    createElement(
      MemoryRouter,
      null,
      createElement(
        ThemeProvider,
        null,
        createElement(TranslationProvider, null, createElement(Header, null))
      )
    )
  );
};

describe('Header', () => {
  it('KGT 로고가 렌더링되어야 한다', () => {
    renderHeader();
    expect(screen.getByText('KGT')).toBeInTheDocument();
  });

  it('다크모드 토글 버튼이 렌더링되어야 한다', () => {
    renderHeader();
    // aria-label로 버튼 탐색 (데스크톱 + 모바일 각 1개씩)
    const toggleButtons = screen.getAllByLabelText('Toggle dark mode');
    expect(toggleButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('다크모드 토글 클릭 시 document에 dark 클래스가 추가되어야 한다', () => {
    renderHeader();
    const [toggleBtn] = screen.getAllByLabelText('Toggle dark mode');
    fireEvent.click(toggleBtn);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('ko 언어로 "문의하기" 버튼이 렌더링되어야 한다', () => {
    renderHeader();
    expect(screen.getByText('문의하기')).toBeInTheDocument();
  });

  it('현재 언어 코드(KO)가 표시되어야 한다', () => {
    renderHeader();
    expect(screen.getByText('KO')).toBeInTheDocument();
  });
});
