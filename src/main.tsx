
  import { createRoot } from "react-dom/client"; //React 18의 “렌더링 엔진 진입 API”
  import App from "./App.tsx";
  import "./index.css"; 

  createRoot(document.getElementById("root")!).render(<App />); 

  /*
1. import { createRoot } from "react-dom/client";
  - 이후 createRoot(...).render(...)로 React 트리를 DOM에 마운트 가능하게 됨
  - React 18 동시성(Concurrent) 기반 동작의 출발점

2. import App from "./App.tsx";
  - 앱의 최상위 컴포넌트를 가져옴

3. import "./index.css";
  - CSS도 모듈로 import해서 번들러(Vite)가 처리
  - 

4. createRoot(document.getElementById("root")!).render(<App />); 
  - “앱 실행 시작” 
  - document.getElementById("root")로 index.html의 루트 DOM을 찾음
  - createRoot(...)로 React 루트를 만듦
  - !(non-null assertion)의 의미: “root가 null이 아님”을 TS에 강제 선언. (장점: 타입 에러 제거, 위험: index.html에 id="root"가 없으면 런타임 에러)
  - .render(<App />)로 React 컴포넌트 트리를 실제 DOM에 연결함.


  */
  