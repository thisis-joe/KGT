// Vitest 설정 - vite.config.ts와 분리해 테스트 전용 설정만 관리
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // jsdom 환경: window, document, localStorage 등 브라우저 API 사용 가능
    environment: 'jsdom',
    // 각 테스트 파일 실행 전 setup 파일 로드 (@testing-library/jest-dom matchers 등록)
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
