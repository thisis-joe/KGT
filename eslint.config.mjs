// ESLint 9 flat config
// @typescript-eslint/eslint-plugin v8 + eslint-plugin-react v7 + Prettier

import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';

export default [
  // 검사 대상 파일: src 디렉토리 내 TS/TSX
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // TypeScript 권장 규칙
      ...tsPlugin.configs.recommended.rules,

      // React 권장 규칙
      ...reactPlugin.configs.recommended.rules,

      // React Hooks 규칙 (hooks 순서·의존성 배열 강제)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React 17+ JSX transform 사용 → import React 불필요
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // any 사용 경고 (에러 대신 warn - 기존 코드 유지)
      '@typescript-eslint/no-explicit-any': 'warn',

      // 콘솔 로그 경고
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // Prettier 충돌 규칙 비활성화 (항상 마지막에 위치)
  prettierConfig,
];
