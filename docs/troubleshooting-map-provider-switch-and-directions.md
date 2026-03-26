# Troubleshooting: Naver/Kakao 지도 전환 잔상 및 길찾기 버튼 동작 개선

## 증상

1. Naver 지도를 보다가 Kakao로 전환하면, 지도는 카카오로 보이지만 **좌하단 Naver 저작권 문구/우하단 Naver UI 잔상**이 남음
2. Kakao 상태에서 다시 Naver로 전환 시, **지도 영역 갱신이 늦고 전환이 매끄럽지 않음**
3. 우하단 외부 지도 버튼이 단순 지도 열기로 동작해, 요구사항인 **현재 위치 → 목적지 길찾기** 흐름과 다름

## 원인

### 1) Provider 전환 시 컨테이너/마커 정리 부재

`src/pages/ContactPage.tsx`에서 Naver/Kakao 모두 같은 컨테이너(`mapRef`)에 렌더링되는데,
전환 시 이전 provider가 추가한 DOM(저작권, 컨트롤)과 마커를 명시적으로 정리하지 않아 잔상이 남았다.

### 2) 비동기 SDK 로딩 콜백 경합(race)

provider를 빠르게 전환하면, 먼저 시작된 비동기 로딩 콜백이 나중에 도착해 최신 상태를 덮어쓸 수 있어
전환 체감이 느려지고 상태가 꼬였다.

### 3) 외부 링크 URL이 길찾기 중심이 아님

기존 링크는 지도/핀 열기 위주라서 현재 위치를 출발지로 한 경로 탐색 요구를 충족하지 못했다.

## 해결

## 1) 지도 전환 lifecycle 정리 추가

파일: `src/pages/ContactPage.tsx`

- `mapCleanupRef` 추가: provider 전환/언마운트 시 이전 마커 및 DOM 정리
- `mapRenderIdRef` 추가: 최신 렌더만 유효하도록 stale 콜백 차단
- provider 변경 시작 시 즉시:
  - `setMapStatus('loading')`
  - 이전 cleanup 실행
  - `container.innerHTML = ''`로 컨테이너 초기화

핵심 효과:

- Naver → Kakao 전환 시 Naver 저작권/버튼 잔상 제거
- Kakao → Naver 재전환 시 오래된 콜백이 화면을 덮어쓰지 않음

## 2) 마커 정리 공통화

- Naver/Kakao marker 객체를 cleanup 리스트에 등록
- 전환/언마운트 시 `setMap(null)` 수행

## 3) 외부 버튼을 길찾기 링크로 변경

파일: `src/pages/ContactPage.tsx`

- 버튼 라벨: `Open in ...` → `Directions in ...`
- 현재 위치가 있을 때:
  - **Naver**: `nmap://route/car?...` (현재 위치 → 본사)
  - **Kakao**: `https://m.map.kakao.com/scheme/route?...` (현재 위치 → 본사)
- 현재 위치가 없을 때는 기존 지도 검색/핀 링크로 fallback

## 참고한 URL 스킴 방향

- Naver: app scheme 기반 경로 탐색 URL 사용
- Kakao: mobile web scheme route URL 사용

> 주의: 앱 설치/플랫폼/브라우저 정책에 따라 scheme deep link 동작은 달라질 수 있음

## 검증 결과

- `lsp_diagnostics` (ContactPage): **에러 0**
- `npm run build`: **성공**

빌드 중 1회 optional dependency(`@rollup/rollup-linux-x64-gnu`) 누락 오류가 있었고,
`npm install` 후 재빌드로 정상 통과했다.
