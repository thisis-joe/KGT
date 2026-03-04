// 테스트 전역 setup 파일
// 1. @testing-library/jest-dom의 커스텀 matchers 등록 (toBeInTheDocument, toHaveClass 등)
// 2. jsdom에 없는 브라우저 API 폴리필/목(mock) 설정
import '@testing-library/jest-dom';

// jsdom은 window.matchMedia를 구현하지 않으므로 목(mock)으로 대체
// ThemeProvider의 getInitialTheme()이 OS 다크모드 감지를 위해 이 API를 사용함
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false, // 기본값: 라이트 모드
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
