# Troubleshooting: Vercel 배포 시 SPA 새로고침 404 및 API 엔드포인트 분리

## 증상

1. `/contact` 페이지에서 새로고침(F5)하면 **404 에러** 발생
2. SPA rewrite 적용 시 `POST /api/contact` 메일 전송 API가 함께 깨질 우려

## 원인

### 404 에러

React Router의 `createBrowserRouter`는 HTML5 History API(`pushState`)를 사용하여 클라이언트 측에서 URL을 변경한다. `/contact`는 서버에 실제 존재하는 물리적 파일이 아니라 자바스크립트가 브라우저 내에서 그려주는 가상 경로다.

| 동작                    | 과정                                          | 결과            |
| ----------------------- | --------------------------------------------- | --------------- |
| 내부 링크 이동          | `index.html` 로드 → JS가 라우팅 제어          | 정상            |
| `/contact`에서 새로고침 | 브라우저가 Vercel 서버에 `/contact` 파일 요청 | 파일 없음 → 404 |

### API 엔드포인트

기존 메일 전송 로직은 `vite.config.ts`의 Vite dev server 미들웨어(`configureServer`)로 구현되어 있었다. Vite dev server는 로컬 개발 환경에서만 동작하며, Vercel 프로덕션 환경에서는 이 미들웨어가 실행되지 않는다.

SPA rewrite(`/(.*) → /`)를 적용하면 `/api/contact` 요청까지 `index.html`로 라우팅되므로, 별도의 서버 사이드 엔드포인트가 필요하다.

## 해결

### 1. `vercel.json` — SPA 폴백 설정

프로젝트 루트에 `vercel.json` 생성:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

모든 경로를 `index.html`로 rewrite하여 클라이언트 측 라우팅이 동작하도록 한다.

### 2. `api/contact.ts` — Vercel Serverless Function

`vite.config.ts`의 메일 전송 로직을 `api/contact.ts`로 이전하여 Vercel Serverless Function으로 동작시킨다.

- `nodemailer`로 Gmail SMTP 전송
- 요청 검증 및 sanitize 로직 동일 적용
- 환경변수: `MAIL_GMAIL_USER`, `MAIL_GMAIL_APP_PASSWORD`, `MAIL_RECEIVER_EMAILS`

### 우선순위 동작 원리

Vercel은 `/api` 디렉토리의 Serverless Function을 rewrites보다 **우선 처리**한다.

```
POST /api/contact  →  api/contact.ts (Serverless Function)
GET  /contact      →  / (rewrite → index.html → React Router)
GET  /             →  / (index.html)
```

## 배포 체크리스트

- [ ] Vercel 대시보드 → Settings → Environment Variables에 아래 3개 등록:
  - `MAIL_GMAIL_USER`
  - `MAIL_GMAIL_APP_PASSWORD`
  - `MAIL_RECEIVER_EMAILS`
- [ ] `@vercel/node`가 devDependencies에 포함되어 있는지 확인
- [ ] 배포 후 `/contact` 새로고침 시 정상 로딩 확인
- [ ] 문의 폼 전송 후 메일 수신 확인
