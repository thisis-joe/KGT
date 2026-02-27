# 언어별 QA 체크리스트

## 목적
- 다국어 UI 품질을 일관되게 유지하고, 운영 중 번역/표기 오류를 사전에 방지한다.

## 공통 기준
- 번역 톤은 `격식/신뢰` 스타일을 유지한다.
- 브랜드명/제품명 표기는 원문 기준을 유지한다.
- 주소/지점명 표기는 현지어 변환 없이 `영문 고정` 정책을 따른다.
- 문의(Contact) 페이지의 성공/실패/안내 메시지는 의미가 동일해야 한다.
- 키 누락 시 화면에 키 문자열(`contactPage.form.*`)이 노출되지 않아야 한다.

## 영문 고정 표기(필수)
- Head Office / R&D Center
- 2F, 40, Hasinjungang-ro 54beon-gil (Jangnim-dong), Saha-gu, Busan, Republic of Korea
- Gyeonggi Sales Office
- B-3321, Geumgang Penterium IX Tower, 27 Dongtancheomdansaneop 1-ro, Hwaseong-si, Gyeonggi-do, Republic of Korea
- Tel: 051-265-7481
- Fax: 051-266-7481

## 언어별 점검 항목

### 1) Korean (`ko`)
- 문장 어미가 비격식 표현으로 섞이지 않았는지 확인 (`~합니다/드립니다` 중심)
- 법적/안내 문구(개인정보 동의, 서버 오류)가 완곡하고 명확한지 확인
- 영문 고정 표기(주소/지점명/Tel/Fax)가 임의 번역되지 않았는지 확인

### 2) English (`en`)
- 과장 표현보다 신뢰/정확성 중심 문장인지 확인
- 용어 일관성 확인: inquiry, privacy policy, mail server, direct email
- 영문 고정 주소/지점명이 정확히 일치하는지 확인

### 3) Chinese (`zh`)
- 간체 표기 통일 여부 확인
- 과도한 구어체/마케팅 문구 제거 여부 확인
- 영문 고정 주소/지점명/연락처가 그대로 유지되는지 확인

### 4) Japanese (`ja`)
- 경어체 톤 유지 여부 확인 (`です/ます` 체)
- 안내/오류 문구의 단정적 표현이 과하지 않은지 확인
- 영문 고정 주소/지점명/연락처가 그대로 유지되는지 확인

### 5) Spanish (`es`)
- 지역 중립적인 표현 사용 여부 확인
- 문의/개인정보/오류 안내 문구가 정중한지 확인
- 영문 고정 주소/지점명/연락처가 그대로 유지되는지 확인

### 6) Filipino (`fil`)
- 영어 혼용 시 의미 전달이 어색하지 않은지 확인
- 고객 응대 문장이 정중한지 확인
- 영문 고정 주소/지점명/연락처가 그대로 유지되는지 확인

### 7) Vietnamese (`vi`)
- 존중 표현(격식체) 유지 여부 확인
- 개인정보/오류 문구의 의미가 축약되지 않았는지 확인
- 영문 고정 주소/지점명/연락처가 그대로 유지되는지 확인

## 기능 점검 체크리스트 (언어별 공통)
- 언어 전환 시 `Header`, `Hero`, `Contact form`, `Footer` 텍스트가 즉시 변경되는가
- 문의 폼 Subject 입력란(텍스트)이 정상 입력/전송되는가
- Reply Email(답변받을 이메일)과 Sender Email(발신 표시 이메일) 필드가 의도대로 동작하는가
- `privacy` 미동의 시 오류 메시지가 해당 언어로 노출되는가
- 서버 연결 실패 시 fallback 메시지가 해당 언어로 노출되는가
- 메일 서버 미설정 시 `mail_config_error` 메시지가 해당 언어로 노출되는가
- 지도 provider 전환(`NAVER`/`KAKAO`) 버튼이 동작하는가 (기본: NAVER)
- Footer `Privacy Policy` / `Terms of Service` 클릭 시 팝업이 정상 노출되는가
- Footer `Send Feature Suggestion` 클릭 시 팝업이 정상 동작하는가

## 키/구조 점검
- 대상 파일:
  - `src/locales/ko.ts`
  - `src/locales/en.ts`
  - `src/locales/zh.ts`
  - `src/locales/ja.ts`
  - `src/locales/es.ts`
  - `src/locales/fil.ts`
  - `src/locales/vi.ts`
- `contactPage` 키 구조가 모든 언어 파일에서 동일한지 확인
- 신규 키 추가 시 7개 언어 파일 동시 반영

## 배포 전 최소 검수 절차
1. `npx tsc --noEmit`
2. `npm run dev` 실행 후 언어 전환 수동 점검
3. Contact 페이지 제출 상태 4종 점검
   - success
   - privacy_error
   - fallback
   - mail_config_error

## 관련 문서
- 상세 스크린샷 검수 템플릿: `src/guidelines/언어별_QA_검수_템플릿.md`
