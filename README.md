# KGT UI

KGT 기업 소개 및 문의 수집을 위한 React/Vite 기반 다국어 웹사이트입니다.  
랜딩 페이지, 문의 페이지, 다크 모드, 7개 언어 전환, 지도 SDK 연동, 이메일 전송 API를 포함합니다.

## 1. 프로젝트 개요

- 프론트엔드: React 18 + TypeScript + Vite 6
- 스타일: Tailwind CSS v4
- 라우팅: React Router
- 애니메이션: `motion`
- 메일 전송: Nodemailer
- 배포 대상: Vercel

현재 주요 라우트는 아래 2개입니다.

- `/`: 회사 소개 랜딩 페이지
- `/contact`: 문의 접수 및 위치 안내 페이지

## 2. 주요 기능

- 다국어 지원: `ko`, `en`, `zh`, `ja`, `es`, `fil`, `vi`
- 라이트/다크 테마 전환
- 회사 소개, 사업 포트폴리오, 카탈로그 다운로드 UI
- 문의 폼 제출
- Naver Map / Kakao Map 전환 표시
- Footer 내 정책 모달 및 기능 제안 전송
- Vercel 서버리스 함수 기반 메일 발송

## 3. 화면 구성

### 홈(`/`)

- `Hero`: 메인 카피와 CTA
- `CompanyOverview`: 핵심 가치 소개
- `BusinessPortfolio`: 제품/소재/서비스 포트폴리오
- `StoreSection`: 스마트스토어 섹션
  - 현재 `src/config/features.ts`에서 `naverStore: false`라 비활성화 상태

### 문의(`/contact`)

- 회사 연락처 및 주소 표시
- 지도 공급자 선택: Naver / Kakao
- 사용자 현재 위치 확인 후 지도에 마커 표시
- 문의 폼 제출
- 서버 메일 설정이 없을 때 일부 상황에서 `mailto:` 대체 흐름 사용

## 4. 기술 구조

### 프론트엔드

- [`src/App.tsx`](/mnt/c/SSAFY/joseph/workspaces/KGT/src/App.tsx): Theme/i18n/Router 루트 조립
- [`src/routes.tsx`](/mnt/c/SSAFY/joseph/workspaces/KGT/src/routes.tsx): `/`, `/contact`, `404` 라우트 정의
- [`src/utils/i18n.ts`](/mnt/c/SSAFY/joseph/workspaces/KGT/src/utils/i18n.ts): 언어 상태와 번역 Provider
- [`src/utils/theme.ts`](/mnt/c/SSAFY/joseph/workspaces/KGT/src/utils/theme.ts): 테마 상태 관리
- [`src/services/api.ts`](/mnt/c/SSAFY/joseph/workspaces/KGT/src/services/api.ts): `/api/contact` 호출

### 메일 API

- 개발 환경: [`vite.config.ts`](/mnt/c/SSAFY/joseph/workspaces/KGT/vite.config.ts)의 custom middleware가 `/api/contact` 처리
- 배포 환경: [`api/contact.ts`](/mnt/c/SSAFY/joseph/workspaces/KGT/api/contact.ts) 서버리스 함수가 `/api/contact` 처리

즉, 로컬 개발과 Vercel 배포 모두 같은 엔드포인트 경로를 사용합니다.

## 5. 시작 방법

### 요구 사항

- Node.js 18 이상 권장
- npm 사용

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

기본 개발 서버 포트는 `3000`입니다.

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

### 테스트

```bash
npm run test:run
```

### 린트

```bash
npm run lint
```

## 6. 환경 변수

`.env`에 아래 값을 설정해야 합니다.

### 클라이언트 빌드 타임 변수

- `VITE_NAVER_MAP_KEY_ID`: 네이버 지도 SDK 키
- `VITE_KAKAO_MAP_APP_KEY`: 카카오 지도 SDK 키
- `VITE_CONTACT_RECEIVER_EMAIL`: 클라이언트 대체 메일 수신 주소

### 서버 런타임 변수

- `MAIL_GMAIL_USER`: Gmail 발신 계정
- `MAIL_GMAIL_APP_PASSWORD`: Gmail 앱 비밀번호
- `MAIL_RECEIVER_EMAILS`: 수신 이메일 목록, 쉼표 구분

예시:

```env
MAIL_GMAIL_USER=your-account@gmail.com
MAIL_GMAIL_APP_PASSWORD=your-app-password
MAIL_RECEIVER_EMAILS=team@example.com,ops@example.com
VITE_CONTACT_RECEIVER_EMAIL=team@example.com
VITE_NAVER_MAP_KEY_ID=your-naver-key
VITE_KAKAO_MAP_APP_KEY=your-kakao-key
```

## 7. 배포 메모

- [`vercel.json`](/mnt/c/SSAFY/joseph/workspaces/KGT/vercel.json)에 SPA rewrite가 설정되어 있어 `/contact` 직접 접근 시 404를 방지합니다.
- Vercel에서는 `.env`가 자동 반영되지 않으므로 대시보드에 환경 변수를 별도로 등록해야 합니다.
- `VITE_` 접두사 변수는 빌드 시점에 번들에 포함되므로, 변경 후 재배포가 필요합니다.
- 지도 키는 각 공급자 콘솔에서 배포 도메인을 허용 목록에 추가해야 정상 동작합니다.

관련 문서:

- [`docs/troubleshooting-vercel-env-variables.md`](/mnt/c/SSAFY/joseph/workspaces/KGT/docs/troubleshooting-vercel-env-variables.md)
- [`docs/troubleshooting-vercel-spa-404-and-api.md`](/mnt/c/SSAFY/joseph/workspaces/KGT/docs/troubleshooting-vercel-spa-404-and-api.md)
- [`docs/2026-03-18-changelog.md`](/mnt/c/SSAFY/joseph/workspaces/KGT/docs/2026-03-18-changelog.md)

## 8. 디렉터리 구조

```text
KGT/
├─ api/                  # Vercel serverless functions
├─ docs/                 # 배포/트러블슈팅/변경 기록
├─ public/               # 정적 파일
├─ src/
│  ├─ components/        # 공통 UI 컴포넌트
│  ├─ config/            # feature flag
│  ├─ locales/           # 언어별 번역 리소스
│  ├─ pages/             # 라우트 페이지
│  ├─ services/          # API 호출 계층
│  ├─ styles/            # 글로벌 스타일
│  ├─ test/              # 테스트 설정
│  └─ utils/             # i18n, theme 유틸
├─ vercel.json
├─ vite.config.ts
└─ package.json
```

## 9. 참고 사항

- 일부 소스 파일에는 학습/설명 목적의 장문 주석이 포함되어 있습니다.
- 현재 카탈로그 다운로드 링크는 placeholder 성격의 정적 파일을 가리킵니다.
- `node_modules`, `dist`, 세션 기록 파일은 문서화 대상에서 제외하는 것이 적절합니다.
