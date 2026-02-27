/*
`App`은 “화면 자체”를 많이 그리는 파일이라기보다, 
- 전역 스타일 + i18n Provider + RouterProvider를 조립하는 루트 컴포넌트 역할
- 실제 페이지 UI는 `routes.tsx`에서 지정된 각 페이지 컴포넌트가 담당
*/

import { RouterProvider } from 'react-router-dom';  // React Router가 제공하는 “라우터 실행 컴포넌트” 가져옴  
import { router } from './routes.tsx';              // 라우트 정의 객체(`createBrowserRouter(...)` 결과) 가져옴  
import { TranslationProvider } from './utils/i18n'; // 다국어(i18n) 컨텍스트 제공 컴포넌트 가져옴  
import './styles/globals.css';                      // 전역 스타일 파일 로드

export default function App() { //앱 루트 컴포넌트 기본 export로 선언 `main.tsx`에서 `import App from './App.tsx'`로 바로 가져올 수 있게 함  
  return (
    <div className="min-h-screen font-sans">
      <TranslationProvider>
        <RouterProvider router={router} />
      </TranslationProvider>
    </div>  // <!--루트 레이아웃 wrapper 종료, 전체 앱 레이아웃 공통 스타일 적용 범위 닫힘  
  );        // JSX 반환 종료  
}


/*
1. `import { RouterProvider } from 'react-router-dom';`  
- 원리: `RouterProvider`가 URL 변화(`pushState`, `popstate`) 감지해서 현재 경로에 맞는 컴포넌트 렌더함  
- 영향: 이 import 없으면 라우팅 트리 화면에 붙일 수 없음  

2. `import { router } from './routes.tsx';`  
- 원리: URL 경로와 렌더할 엘리먼트 매핑한 설정을 `RouterProvider`에 주입함  
- 영향: 앱의 페이지 구조(`/`, `/contact`, `*`)가 이 값에 의해 결정됨  

3. `import './styles/globals.css';`   
- 원리: Vite가 CSS import를 번들에 포함시켜 앱 시작 시 적용함  
- 영향: 타이포, 레이아웃, 기본 색상 같은 전역 스타일 활성화됨. 제거하면 전체 UI 스타일 크게 달라질 수 있음  

4. `import { TranslationProvider } from './utils/i18n';`  
- 원리: React Context Provider로 하위 트리에 언어 상태/번역 함수 공급함  
- 영향: 하위 페이지들이 언어 변경/번역 문자열 접근 가능해짐  

5. `export default function App() {`  
- 원리: `main.tsx`에서 `import App from './App.tsx'`로 바로 가져올 수 있게 함  
- 영향: 이 함수가 앱 UI 트리 최상단 entry 역할

6. `return`  
- 의미: 컴포넌트가 렌더할 JSX 시작  
- 원리: React가 이 JSX를 가상 DOM으로 해석함  
- 영향: 아래 트리 구조가 실제 화면/라우팅/컨텍스트 적용 순서 결정함  

      `<div className="min-h-screen font-sans">`  
      - 의미: 최상위 래퍼 div
      - 원리: Tailwind 클래스로 최소 높이 화면 높이로 맞추고 기본 폰트 sans 계열로 지정
      - 영향: 전체 페이지가 화면 높이 채우고, 기본 폰트 기준 여기서 잡힘  

          `<TranslationProvider>`  
          - 의미: 라우터를 i18n Provider로 감쌈  
          - 원리: Provider 안 모든 컴포넌트가 번역 컨텍스트 구독 가능해짐  
          - 영향: 라우트 페이지 전체에서 동일한 언어 상태 공유함  

            `<RouterProvider router={router} />`  
          - 의미: 실제 라우팅 엔진 실행
          - 원리: 전달된 `router` 설정 기반으로 현재 URL에 맞는 element 렌더하고 navigation state 관리
          - 영향: 앱이 SPA처럼 페이지 전환됨. 이 줄 없으면 경로별 페이지 렌더 자체 안 됨  

*/

/*

* i18n Provider (TranslationProvider)
  - 역할: 다국어 상태(현재 언어, 번역 함수)를 하위 컴포넌트에 전역 공급
  - 원리: React Context Provider로 값 제공
  - 영향: 하위 어디서든 t('key') 같은 번역 접근 가능, 언어 변경 시 관련 UI 재렌더

* `RouterProvider`
- 역할: 라우터 객체(`router`)를 실행해서 URL에 맞는 페이지를 렌더
- 원리: `createBrowserRouter`로 만든 라우트 설정을 받아, History API 기반으로 경로 매칭/전환 처리
- 영향: `/`, `/contact` 같은 SPA 페이지 이동이 동작하고, 뒤로가기/앞으로가기와 동기화됨

*
- `TranslationProvider`가 바깥, `RouterProvider`가 안쪽이면
- 라우터로 렌더되는 모든 페이지가 i18n 컨텍스트를 공유

*/