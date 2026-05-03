// BMNR 핵심 지표 — 수동 업데이트 (NYSE 공시 기준)
// 마지막 업데이트: 2026-04-26 (공시일 2026-04-27)
// 출처: Bitmine PR Newswire, April 27, 2026

export const SNAPSHOT = {
  updatedAt: '2026-04-26',
  ethHoldings: 5_078_386,       // ETH 보유량 (공시 기준)
  ethSupplyPct: 4.21,           // 전체 발행량 대비 % (ETH 총 발행량 1.207억개 기준)
  ethTargetPct: 5.0,            // 목표 % (Alchemy of 5%)
  stakingYield: 3.033,          // 7일 연환산 수익률 % (BMNR 자체 운용, CESR 3.028%)
  stakedETH: 3_701_589,         // 스테이킹된 ETH 수량
  stakedPct: 72.9,              // 보유 ETH 중 스테이킹 비율 (3,701,589 / 5,078,386)
  mNAV: 0.93,                   // 주가/순자산가치 배수 — 할인 구간
  ethPriceUSD: 2_369,           // ETH 가격 (공시 기준 USD)
  annualStakingRevenueUSD: 264_000_000,  // 현재 스테이킹 기준 연간 수익 (공시)
  annualStakingProjectedUSD: 363_000_000, // 전량 스테이킹 시 연간 수익 (추산)
  totalHoldingsUSD: 13_300_000_000,       // 크립토 + 현금 + 문샷 합계
  cashUSD: 940_000_000,          // 현금 보유
  dailyVolumeUSD: 845_000_000,   // 일평균 거래대금 (5일 평균)
  exchange: 'NYSE',              // 2026-04-09 NYSE 업리스팅
}

// Alchemy of 5% 진행률 (공시: "84% of the way to the Alchemy of 5%")
export const ALCHEMY_PROGRESS = {
  current: SNAPSHOT.ethSupplyPct,
  target: SNAPSHOT.ethTargetPct,
  pct: 84.2,
}

// 주간 매집 누적 데이터 (날짜, 누적 ETH)
export const ACCUMULATION_DATA = [
  { date: '2024-07', eth: 11500,    label: '24.07' },
  { date: '2024-08', eth: 28400,    label: '24.08' },
  { date: '2024-09', eth: 52000,    label: '24.09' },
  { date: '2024-10', eth: 79800,    label: '24.10' },
  { date: '2024-11', eth: 112000,   label: '24.11' },
  { date: '2024-12', eth: 148500,   label: '24.12' },
  { date: '2025-01', eth: 179000,   label: '25.01' },
  { date: '2025-02', eth: 208000,   label: '25.02' },
  { date: '2025-03', eth: 231000,   label: '25.03' },
  { date: '2025-04', eth: 253000,   label: '25.04' },
  { date: '2025-05', eth: 269000,   label: '25.05' },
  { date: '2025-06', eth: 520000,   label: '25.06' },
  { date: '2025-07', eth: 980000,   label: '25.07' },
  { date: '2025-08', eth: 1_680000, label: '25.08' },
  { date: '2025-09', eth: 2_350000, label: '25.09' },
  { date: '2025-10', eth: 3_100000, label: '25.10' },
  { date: '2025-11', eth: 3_820000, label: '25.11' },
  { date: '2025-12', eth: 4_390000, label: '25.12' },
  { date: '2026-01', eth: 4_720000, label: '26.01' },
  { date: '2026-02', eth: 4_890000, label: '26.02' },
  { date: '2026-03', eth: 4_980000, label: '26.03' },
  { date: '2026-04', eth: 5_040000, label: '26.04' },
  { date: '2026-05', eth: 5_078000, label: '26.05' },
]

// 주간 분석 코멘터리
export const COMMENTARY = [
  {
    id: 1,
    date: '2025-04-28',
    week: '2025년 17주차',
    title: 'mNAV 1.3x 진입 — 프리미엄이 말하는 것',
    confidence: 'yellow', // green / yellow / red
    body: `BMNR 주가가 순자산가치(ETH 시가총액 기준) 대비 1.32배에 거래 중임.

[사실] 현재 보유 ETH 269,000개, 전체 발행량 4.2% 수준.
[해석] mNAV 1.3x는 단순 ETH 익스포저 이상의 스토리 프리미엄이 반영된 수준. 5% 목표 달성 기대 + 텀리의 내러티브 효과.
[주의] mNAV가 1.0x 이하로 내려가면 신주 발행을 통한 희석 리스크 점검 필요.

이번 주 스테이킹 수익률은 네이티브 벤치마크(3.4%)와 유사하게 유지 중. DAT 운용 알파가 아직 뚜렷하지 않다는 점은 여전히 체크 포인트.`,
    tags: ['mNAV', '스테이킹', '5%목표'],
  },
  {
    id: 2,
    date: '2025-04-21',
    week: '2025년 16주차',
    title: 'CLARITY 법안 진전 — ETH 담보자산 프레임 강화',
    confidence: 'green',
    body: `미 하원 CLARITY 법안 세부 논의 진전. DeFi 규제 명확화 + 토큰 증권 분류 기준 구체화 방향.

[사실] 법안 초안 공개, 위원회 검토 단계 진입.
[해석] 통과 시 ETH가 기관 담보자산으로 편입되는 제도적 경로가 열림. 스테이블코인+RWA 흐름과 연동되면 ETH 구조적 수요 발생 가능.
[불명] 최종 통과 시점, 내용 희석 가능성.

비트마인 입장에서는 5% 보유 + 제도권 온체인 금융 활성화가 시너지 구조. 스테이킹 수익 + 거버넌스 영향력 + 신사업 확장 세 가지가 맞물리는 그림.`,
    tags: ['CLARITY', '규제', '제도권'],
  },
  {
    id: 3,
    date: '2025-04-14',
    week: '2025년 15주차',
    title: '한화 투자 유입 — 기관 신뢰도 업데이트',
    confidence: 'green',
    body: `한화그룹 계열사 BMNR 지분 취득 공시. 아크 인베스트(돈나무)도 지속 보유 중.

[사실] SEC 13F 공시 기준 기관 보유 비율 증가 확인.
[해석] 실사 없이 기관 자금이 들어오지 않음. 정보 투명성 우려에도 불구하고 기관 진입은 일종의 간접 검증.
[주의] 기관 진입이 주가 상승을 보장하지는 않음. mNAV 관리, 주당 ETH 보유량 지표를 함께 봐야 함.

개인적으로는 비트마인의 공격적 구조(신주 발행 지속 + 외부 운용사)보다 샤프링크의 보수적 구조가 장기 보유 관점에서 더 선호됨. 단, 스토리 트레이딩은 비트마인이 더 강함.`,
    tags: ['기관투자', '한화', '아크'],
  },
]
