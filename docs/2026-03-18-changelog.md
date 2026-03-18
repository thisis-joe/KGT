# KGT 프로젝트 이슈 분석 및 수정 기록

**날짜**: 2026-03-18

---

## 수정 완료

### 1. 필리핀어 "문의하기" 버튼 너비 문제

**증상**: 필리핀어 선택 시 헤더의 문의하기 버튼 텍스트(`MAKIPAG-UGNAYAN`)가 15자로 너무 길어, 좁은 화면에서 레이아웃이 깨짐.

**원인**: `uppercase` + `tracking-wider` + `whitespace-nowrap` 조합으로 텍스트 폭이 과도하게 증가.

**수정**: `src/locales/fil.ts`에서 `nav.contact` 번역을 `"Makipag-ugnayan"` → `"Kontak"`으로 변경 (15자 → 6자).

---

### 2. 모바일 브라우저 지도 렌더링 실패 (컨테이너 크기)

**증상**: 모바일 브라우저에서 ContactPage의 Naver/Kakao 지도가 표시되지 않음.

**원인**: 지도 `div`가 `w-full h-full`(상대 크기)로 설정되어 있어, 부모 레이아웃이 완료되기 전에 SDK가 초기화되면 0×0 컨테이너에 렌더링됨. 모바일/저사양 기기에서 이 타이밍 이슈가 더 빈번함.

**수정**: `src/pages/ContactPage.tsx`에서 지도 초기화를 `requestAnimationFrame`으로 감싸, 브라우저 레이아웃 계산 완료 후 SDK가 실행되도록 변경. cleanup 함수로 언마운트 시 `cancelAnimationFrame` 호출 추가.

---

### 3. Footer 사업자 정보 추가

**요청**: Footer 하단에 사업자등록번호 및 대표자 정보 추가.

**수정**: `src/components/Footer.tsx` 하단 바에 `사업자등록번호 734-81-02075 | 대표자 주창석`을 copyright 아래에 배치. 기존 `text-xs text-gray-400` 스타일 유지, 모바일 중앙 정렬 / 데스크톱 좌측 정렬.

---

### 4. Hero 섹션 모바일 과도한 여백

**증상**: 모바일 화면에서 Hero 영역이 `h-screen`(100vh)으로 고정되어, 콘텐츠 위아래에 불필요한 빈 공간이 과도하게 발생.

**수정**: `src/components/Hero.tsx`에서 `h-screen` → `min-h-[75vh] md:h-screen`으로 변경. 모바일에서는 콘텐츠에 맞게 축소(최소 75vh), 데스크톱에서는 기존 풀 뷰포트 유지.

---

## 분석 완료 (미수정 — 추가 작업 필요)

### 5. 모바일 브라우저 지도 미표시 (API 키 도메인 제한)

**원인**: Naver/Kakao 개발자 콘솔에서 허용 도메인에 배포 도메인이 등록되지 않으면 SDK 로드 자체가 차단됨.

**조치 필요**: 각 지도 서비스 개발자 콘솔에서 배포 도메인을 허용 목록에 추가.

---

### 6. 카카오 지도 외부 링크 오류

**원인**: 카카오 지도 링크 URL이 사무실 좌표가 아닌 사용자 현재 위치 좌표를 사용.

```tsx
// 현재 (버그)
const kakaoMapUrl = `https://map.kakao.com/link/map/KGT,${currentCoords.lat},${currentCoords.lng}`;
// currentCoords = 사용자 위치 || 사무실 좌표

// 수정 필요
const kakaoMapUrl = `https://map.kakao.com/link/map/KGT,${HEAD_OFFICE_COORDS.lat},${HEAD_OFFICE_COORDS.lng}`;
```

---

### 7. 초기 언어 한국어 강제

**원인**: `getInitialLanguage()`가 `localStorage`에서 이전 저장 언어를 읽어, 탭을 닫고 다시 열어도 이전 언어가 유지됨.

**수정 방향**: `getInitialLanguage()`에서 항상 `'ko'` 반환. SPA 내 네비게이션(뒤로/앞으로)은 React 상태로 이미 언어가 유지되므로 별도 처리 불필요.

---

### 8. /contact 새로고침 시 404

**원인**: `createBrowserRouter` 사용 시 서버에 SPA 폴백 설정이 없으면, `/contact` 경로를 서버가 인식하지 못해 404 반환.

**수정 방향 (배포 환경별)**:

| 환경    | 설정                                       |
| ------- | ------------------------------------------ |
| Netlify | `public/_redirects`에 `/* /index.html 200` |
| Vercel  | `vercel.json`에 rewrites 설정              |
| Nginx   | `try_files $uri $uri/ /index.html;`        |

---

### 9. 소스 코드 노출 보안

**현황**: Source map 미생성(양호), 그러나 `VITE_` 접두사 환경변수(API 키)가 클라이언트 번들에 평문 노출.

**보안 강화 계획**:

1. 코드 난독화 (`rollup-plugin-obfuscator`)
2. Naver/Kakao 개발자 콘솔에서 API 키 도메인 제한
3. Terser 기반 minify 강화 (`drop_console`, `drop_debugger`, `toplevel mangle`)

---

### 10. 추가 보안 권고사항

| 우선순위 | 항목                                                      |
| -------- | --------------------------------------------------------- |
| 높음     | HTTPS 강제, CSP 헤더                                      |
| 중간     | `/api/contact` Rate Limiting, CORS 설정, `npm audit`      |
| 낮음     | HTTP 보안 헤더(X-Frame-Options 등), SRI, 에러 메시지 제한 |
