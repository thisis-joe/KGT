/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_CONTACT_RECEIVER_EMAIL?: string;
  readonly VITE_NAVER_MAP_CLIENT_ID?: string;
  readonly VITE_KAKAO_MAP_APP_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  naver?: any;
  kakao?: any;
}
