# BMNR-KR

BMNR (BitMine Immersion Technologies) 한국어 분석 허브.

## 개발 환경 실행

```bash
npm install
npm run dev
```

## 빌드 & 배포 (Cloudflare Pages)

```bash
npm run build
```

Cloudflare Pages 설정:
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `18`

## 데이터 업데이트

`src/data/bmnrData.js` 파일에서 수동으로 업데이트.
SEC 공시 나올 때마다 `SNAPSHOT` 객체 값 수정 후 배포.
