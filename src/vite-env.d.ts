/// <reference types="vite/client" />

export {};

declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL?: string;
    readonly VITE_CONTACT_RECEIVER_EMAIL?: string;
    readonly VITE_NAVER_MAP_KEY_ID?: string;
    readonly VITE_KAKAO_MAP_APP_KEY?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  // interface NaverMapInstance {}

  interface NaverMapsNamespace {
    Map: new (
      container: HTMLElement,
      options: { center: NaverLatLngInstance; zoom: number }
    ) => NaverMapInstance;
    LatLng: new (lat: number, lng: number) => NaverLatLngInstance;
    Marker: new (options: {
      position: NaverLatLngInstance;
      map: NaverMapInstance;
      title?: string;
      icon?: {
        content: string;
        anchor: NaverPointInstance;
      };
    }) => unknown;
    Point: new (x: number, y: number) => NaverPointInstance;
  }

  // interface NaverLatLngInstance {}

  // interface NaverPointInstance {}

  // interface KakaoMapInstance {}

  interface KakaoMapsNamespace {
    load: (cb: () => void) => void;
    Map: new (
      container: HTMLElement,
      options: { center: KakaoLatLngInstance; level: number }
    ) => KakaoMapInstance;
    LatLng: new (lat: number, lng: number) => KakaoLatLngInstance;
    Marker: new (options: {
      map: KakaoMapInstance;
      position: KakaoLatLngInstance;
    }) => {
      setMap: (map: KakaoMapInstance) => void;
    };
  }

  // interface KakaoLatLngInstance {}

  interface Window {
    naver?: { maps: NaverMapsNamespace };
    kakao?: { maps: KakaoMapsNamespace };
  }
}
