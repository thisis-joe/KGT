# 언어별 QA 검수 템플릿 (스크린샷 기반)

## 사용 방법
1. `npm run dev` 실행 후 각 언어를 순서대로 전환한다.
2. 아래 항목별로 데스크톱/모바일 스크린샷을 캡처한다.
3. 체크박스를 완료하고 이슈 로그에 기록한다.

## 기본 정보
- 검수자:
- 검수일:
- 브랜치:
- 빌드 기준 커밋:
- 대상 URL:

## 언어 목록
- [ ] ko
- [ ] en
- [ ] zh
- [ ] ja
- [ ] es
- [ ] fil
- [ ] vi

## 공통 체크 항목 (언어별 반복)
- [ ] Header 메뉴 번역이 자연스럽고 격식/신뢰 톤인가
- [ ] Hero 제목/부제 문장이 격식/신뢰 톤인가
- [ ] Contact Form 라벨/버튼/안내 문구가 누락 없이 번역되었는가
- [ ] Subject 입력란(텍스트)이 정상 입력/전송되는가
- [ ] Reply Email / Sender Email 필드가 의도대로 동작하는가
- [ ] 성공/실패/동의오류/메일설정오류 메시지가 번역되었는가
- [ ] 주소/지점명 표기가 영문 고정 정책과 정확히 일치하는가
- [ ] Tel/Fax 번호가 `051-265-7481 / 051-266-7481`로 노출되는가
- [ ] 지도 provider(NAVER/KAKAO) 전환이 동작하는가 (기본 NAVER)
- [ ] Privacy Policy / Terms of Service 팝업이 정상 노출되는가
- [ ] Send Feature Suggestion 팝업이 정상 동작하는가
- [ ] UI 깨짐(줄바꿈, 버튼 길이, 겹침)이 없는가

## 스크린샷 체크리스트 (언어별)

### 1) ko
- [ ] Desktop - Header
- [ ] Desktop - Hero
- [ ] Desktop - Locations
- [ ] Desktop - Form
- [ ] Desktop - Footer
- [ ] Mobile - Header/Menu
- [ ] Mobile - Form Submit Area

### 2) en
- [ ] Desktop - Header
- [ ] Desktop - Hero
- [ ] Desktop - Locations
- [ ] Desktop - Form
- [ ] Desktop - Footer
- [ ] Mobile - Header/Menu
- [ ] Mobile - Form Submit Area

### 3) zh
- [ ] Desktop - Header
- [ ] Desktop - Hero
- [ ] Desktop - Locations
- [ ] Desktop - Form
- [ ] Desktop - Footer
- [ ] Mobile - Header/Menu
- [ ] Mobile - Form Submit Area

### 4) ja
- [ ] Desktop - Header
- [ ] Desktop - Hero
- [ ] Desktop - Locations
- [ ] Desktop - Form
- [ ] Desktop - Footer
- [ ] Mobile - Header/Menu
- [ ] Mobile - Form Submit Area

### 5) es
- [ ] Desktop - Header
- [ ] Desktop - Hero
- [ ] Desktop - Locations
- [ ] Desktop - Form
- [ ] Desktop - Footer
- [ ] Mobile - Header/Menu
- [ ] Mobile - Form Submit Area

### 6) fil
- [ ] Desktop - Header
- [ ] Desktop - Hero
- [ ] Desktop - Locations
- [ ] Desktop - Form
- [ ] Desktop - Footer
- [ ] Mobile - Header/Menu
- [ ] Mobile - Form Submit Area

### 7) vi
- [ ] Desktop - Header
- [ ] Desktop - Hero
- [ ] Desktop - Locations
- [ ] Desktop - Form
- [ ] Desktop - Footer
- [ ] Mobile - Header/Menu
- [ ] Mobile - Form Submit Area

## 상태별 기능 검수 (언어 1개당 최소 1회)
- [ ] `success` 상태 메시지 확인
- [ ] `privacy_error` 상태 메시지 확인
- [ ] `fallback` 상태 메시지 확인
- [ ] `mail_config_error` 상태 메시지 확인

## 이슈 로그
| ID | 언어 | 화면/구간 | 심각도(High/Med/Low) | 이슈 내용 | 재현 절차 | 스크린샷 경로 | 담당자 | 상태 |
|---|---|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |  |  |
| 3 |  |  |  |  |  |  |  |  |

## 최종 승인
- [ ] 배포 가능
- [ ] 조건부 배포 가능 (Low 이슈만 존재)
- [ ] 배포 보류 (High/Med 이슈 존재)

승인자:
승인일:
