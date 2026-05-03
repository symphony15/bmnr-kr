# CLAUDE.md — bmnr-kr 프로젝트 규칙

## 프로젝트 개요
BMNR (BitMine Immersion Technologies) 한국어 분석 허브.
React + Vite + Tailwind, Cloudflare Pages 배포.

---

## 자동 배포 규칙
모든 코드 수정 완료 후 반드시 아래 순서로 실행할 것:
1. git add .
2. git commit -m "업데이트: [변경한 내용 요약]"
3. git push

예외 없이 항상 push까지 완료해야 작업이 끝난 것으로 간주.

---

## 데이터 업데이트 규칙
- 수치는 `src/data/bmnrData.js` 에서만 수정
- 공시 출처 명시 필수 (SEC EDGAR 8-K / PR Newswire)
- 추정값은 🟡 또는 `Note` 필드로 명시
- mNAV는 외부 트래커(bmnr.rocks) 기준 추정값임을 항상 표시

---

## 기술 스택
- React 18 + Vite 5
- Tailwind CSS 3
- Recharts (차트)
- CoinGecko API (ETH 실시간 가격, 30초 갱신)
- Cloudflare Pages (GitHub main 브랜치 자동 배포)
