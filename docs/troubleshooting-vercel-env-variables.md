# Troubleshooting: Vercel 배포 시 지도·메일 미작동 (환경변수 미설정)

## 증상

- `npm run dev`(로컬)에서는 지도 표시, 메일 전송 모두 정상 동작
- Vercel 배포 환경에서는 지도 미표시, 메일 전송 실패

## 원인

`.env` 파일은 `.gitignore`에 포함되어 Git에 업로드되지 않는다. Vercel 서버에는 이 파일이 존재하지 않으므로 모든 환경변수가 비어 있는 상태로 빌드·실행된다.

### 빌드 타임 변수 (`VITE_` 접두사)

Vite는 `VITE_` 접두사 환경변수를 **빌드 시점에 클라이언트 번들에 하드코딩**한다. Vercel 빌드 시 해당 값이 없으면 빈 문자열(`''`)이 번들에 삽입된다.

```
// 빌드 결과물 내부 (값 없음)
const NAVER_MAP_KEY_ID = '';
const KAKAO_MAP_APP_KEY = '';
→ if (!NAVER_MAP_KEY_ID) setMapStatus('error')  // 지도 로드 실패
```

### 런타임 변수 (접두사 없음)

Serverless Function(`api/contact.ts`)은 런타임에 `process.env`로 환경변수를 읽는다. Vercel 대시보드에 등록되지 않으면 `undefined`가 반환된다.

```
const gmailUser = process.env.MAIL_GMAIL_USER;  // undefined
→ 메일 서버 미설정 에러 반환
```

## 해결

Vercel 대시보드 → **Settings → Environment Variables**에 다음 5개 등록:

| 변수명                    | 용도                    | 적용 시점                    |
| ------------------------- | ----------------------- | ---------------------------- |
| `VITE_NAVER_MAP_KEY_ID`   | 네이버 지도 SDK 키      | 빌드 타임 (클라이언트)       |
| `VITE_KAKAO_MAP_APP_KEY`  | 카카오 지도 SDK 키      | 빌드 타임 (클라이언트)       |
| `MAIL_GMAIL_USER`         | Gmail 발신 계정         | 런타임 (Serverless Function) |
| `MAIL_GMAIL_APP_PASSWORD` | Gmail 앱 비밀번호       | 런타임 (Serverless Function) |
| `MAIL_RECEIVER_EMAILS`    | 수신 이메일 (쉼표 구분) | 런타임 (Serverless Function) |

Environment 설정은 **All** (Production, Preview, Development 모두) 선택.

등록 후 **반드시 재배포(Redeploy)** 필요. `VITE_` 변수는 빌드 시점에 삽입되므로 환경변수 추가만으로는 기존 배포에 반영되지 않는다.

## 재배포 후에도 지도가 안 보이는 경우

환경변수가 정상 설정되었음에도 지도가 표시되지 않으면 **API 키 도메인 제한** 문제다.

- **네이버**: [Naver Cloud Console](https://console.ncloud.com/) → AI·NAVER API → Application → 등록된 앱 → Web 서비스 URL에 Vercel 도메인 추가
- **카카오**: [Kakao Developers](https://developers.kakao.com/) → 내 애플리케이션 → 앱 설정 → 플랫폼 → Web → 사이트 도메인에 Vercel 도메인 추가
