// BMNR 핵심 지표
// 출처: SEC EDGAR 8-K + PR Newswire 공시 기준
// 기준일: 2026-04-26

export const SNAPSHOT = {
  dataDate: '2026-04-26',
  dataSource: 'SEC EDGAR 8-K + PR Newswire 공시 기준',

  // ETH 보유
  ethHoldings: 5_078_386,
  ethSupplyPct: 4.21,             // 총 발행량 1.207억개 기준
  ethTargetPct: 5.0,

  // 스테이킹
  stakedETH: 3_701_589,
  stakedPct: 72.89,
  stakingYield: 3.033,            // BMNR 7일 연환산 수익률 (CESR 3.028%)

  // 가격
  ethPriceUSD: 2_369,
  stockPriceUSD: 21.88,

  // mNAV
  mNAV: 0.93,
  mnavNote: '외부 트래커(bmnr.rocks) 기준 추정값',  // 🟡 추정값

  // 수익
  annualStakingRevenueUSD: 264_000_000,   // 현재 스테이킹 기준
  annualStakingProjectedUSD: 363_000_000, // 전량 스테이킹 시 추산

  // 자산 구성
  totalAssetsUSD: 13_300_000_000,   // 크립토 + 현금 + 문샷 합계
  cashUSD: 940_000_000,
  orbsUSD: 91_000_000,              // Eightco Holdings (NASDAQ: ORBS)
  beastIndustriesUSD: 200_000_000,
  btcHoldings: 200,                 // BTC 보유량
}

// Alchemy of 5% 진행률
export const ALCHEMY_PROGRESS = {
  current: SNAPSHOT.ethSupplyPct,
  target: SNAPSHOT.ethTargetPct,
  pct: 84.2,  // 공시 기준 "84% of the way to the Alchemy of 5%"
}

// 주간 매집 히스토리 — SEC EDGAR 8-K + PR Newswire 공시 검증값만
export const ACCUMULATION_DATA = [
  { date: '2025-11-30', eth: 3_726_499, label: '25.11.30' },
  { date: '2026-02-22', eth: 4_422_659, label: '26.02.22' },
  { date: '2026-03-01', eth: 4_473_587, label: '26.03.01' },
  { date: '2026-03-08', eth: 4_535_000, label: '26.03.08' },
  { date: '2026-03-15', eth: 4_595_562, label: '26.03.15' },
  { date: '2026-03-22', eth: 4_660_903, label: '26.03.22' },
  { date: '2026-04-05', eth: 4_803_334, label: '26.04.05' },
  { date: '2026-04-12', eth: 4_874_858, label: '26.04.12' },
  { date: '2026-04-19', eth: 4_976_485, label: '26.04.19' },
  { date: '2026-04-26', eth: 5_078_386, label: '26.04.26' },
]

// 주간 분석 코멘터리
export const COMMENTARY = [
  {
    id: 1,
    date: '2026-04-28',
    week: '2026년 17주차',
    title: 'mNAV 0.93x 할인 구간 — 의미와 리스크',
    confidence: 'yellow',
    body: `BMNR 주가가 순자산가치(ETH 시가총액 기준) 대비 0.93배, 즉 할인 구간에서 거래 중임.

[사실] ETH 보유량 5,078,386개 (발행량 4.21%), 스테이킹 3,701,589 ETH (72.89%).
[해석] mNAV 1.0x 이하 = 주식이 보유 ETH보다 싸게 거래되는 구간. 이론상 저평가지만, 이게 매수 신호인지 구조적 문제인지는 별개.
[주의] mNAV가 1.0x 이하에서 신주 발행하면 기존 주주 희석. 비트마인은 5% 목표를 위해 신주 발행을 지속 중이라는 점 확인 필요.

🟡 mNAV 수치는 bmnr.rocks 외부 트래커 기준 추정값. 공식 공시값 아님.`,
    tags: ['mNAV', '할인구간', '희석리스크'],
  },
  {
    id: 2,
    date: '2026-04-21',
    week: '2026년 16주차',
    title: '주간 매집 101,901 ETH — 역대 최고 속도',
    confidence: 'green',
    body: `4월 19일→26일 한 주간 101,901 ETH 매집. 2025년 12월 15일 주간 이후 최고 속도.

[사실] 공시 기준: 4,976,485 → 5,078,386 ETH. 증감 +101,901 ETH.
[사실] NYSE 업리스팅 완료 (2026-04-09). 거래대금 일평균 $8.45억 (5일 평균, 미국 129위).
[해석] 5백만 돌파 직후 속도를 더 올리는 건 5% 목표까지 남은 거리(약 22만 ETH)를 의식한 행보로 보임.
[불명] 매집 자금 조달 방식 — 신주 발행인지 현금인지 이번 공시에서 구체적 언급 없음.`,
    tags: ['매집속도', 'NYSE', '5백만돌파'],
  },
  {
    id: 3,
    date: '2026-04-14',
    week: '2026년 15주차',
    title: 'MAVAN 런칭 — 자체 스테이킹 인프라의 의미',
    confidence: 'green',
    body: `비트마인이 자체 스테이킹 플랫폼 MAVAN(Made in America VAlidator Network) 런칭.

[사실] 현재 연간 스테이킹 수익 $264M. 전량 스테이킹 완료 시 $363M 추산 (수익률 3.033%).
[사실] 기존 이드 타워(외부 운용사) 의존에서 자체 인프라로 이동 중.
[해석] 외부 운용 수수료 절감 + 기관 투자자 대상 스테이킹 서비스 확장 가능성. 단순 ETH 홀더에서 스테이킹 인프라 사업자로 포지션 변화.
[주의] MAVAN이 실제로 벤치마크(CESR 3.028%) 대비 알파를 내는지는 장기 추적 필요.`,
    tags: ['MAVAN', '스테이킹', '인프라'],
  },
]
