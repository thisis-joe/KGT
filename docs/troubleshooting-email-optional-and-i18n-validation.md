# Troubleshooting: 이메일 빈칸 전송 실패 및 폼 유효성 경고 한국어 고정

## 증상

1. ContactPage에서 이메일 필드를 비워두고 전송 시, 기본 이메일(`client.kgt.web@gmail.com`)로 전송되어야 하나 **브라우저가 전송 자체를 차단**함
2. 문의하기·기능제안하기 폼에서 필수 항목이 비어 있을 때 **한국어로만 경고**가 표시됨 (다른 언어 선택 시에도 한국어)

## 원인

### 이메일 전송 차단

이메일 `<input>`에 `required` 속성이 설정되어 있어, 값이 비면 HTML5 기본 유효성 검사가 폼 제출을 차단한다. JavaScript `handleSubmit`에 도달하기 전에 브라우저 단에서 막히므로 기본값 대체 로직이 실행되지 않는다.

```
사용자가 이메일 비우고 전송 클릭
  → 브라우저: required 검사 → 빈칸 → 전송 차단 ❌
  → handleSubmit 도달하지 못함
  → DEFAULT_SENDER_EMAIL 대체 로직 실행 불가
```

### 유효성 경고 언어 고정

HTML5 `required` 속성의 기본 유효성 메시지는 **브라우저 언어 설정**에 따라 결정된다. 앱의 i18n 언어 선택과는 무관하게 브라우저가 한국어이면 항상 한국어 경고가 표시된다.

## 해결

### 이메일 필드 → optional 전환

`ContactPage.tsx`에서 이메일 `<input>`의 `required` 속성과 `*` 필수 마커를 제거하고, `handleSubmit` 내에서 빈칸일 때 기본 발신 이메일로 대체한다.

```tsx
// before
const replyEmail = formData.replyEmail.trim();

// after
const replyEmail = formData.replyEmail.trim() || DEFAULT_SENDER_EMAIL;
```

### 유효성 메시지 → i18n 대응

`required` 속성은 유지하되, `onInvalid` 이벤트에서 `setCustomValidity`로 앱의 현재 언어에 맞는 메시지를 설정한다. `onChange` 시 `setCustomValidity('')`로 초기화하여 메시지가 잔류하지 않도록 한다.

```tsx
const requiredMsg =
  currentLanguage === 'ko' ? '이 항목을 입력해주세요.' : 'Please fill out this field.';

<input
  required
  onInvalid={(e) => (e.target as HTMLInputElement).setCustomValidity(requiredMsg)}
  onChange={(e) => {
    e.target.setCustomValidity(''); /* ...기존 핸들러 */
  }}
/>;
```

| 언어 설정  | 표시 메시지                 |
| ---------- | --------------------------- |
| 한국어     | 이 항목을 입력해주세요.     |
| 그 외 전체 | Please fill out this field. |

개인정보 체크박스는 별도 메시지 적용:

| 언어 설정  | 표시 메시지                         |
| ---------- | ----------------------------------- |
| 한국어     | 개인정보처리방침에 동의해주세요.    |
| 그 외 전체 | Please agree to the Privacy Policy. |

### 적용 범위

| 파일              | 대상 필드          | 변경 내용                                 |
| ----------------- | ------------------ | ----------------------------------------- |
| `ContactPage.tsx` | 이메일             | `required` 제거, 빈칸 시 기본 이메일 대체 |
| `ContactPage.tsx` | 이름, 제목, 메시지 | `onInvalid` 핸들러로 KO/EN 메시지 분기    |
| `ContactPage.tsx` | 개인정보 체크박스  | `onInvalid` 핸들러로 KO/EN 메시지 분기    |
| `Footer.tsx`      | 기능제안 textarea  | `onInvalid` 핸들러로 KO/EN 메시지 분기    |
