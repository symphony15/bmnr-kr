import { SNAPSHOT, ALCHEMY_PROGRESS } from '../data/bmnrData'
import { useMarketData } from '../hooks/useMarketData'

// 스켈레톤 블록
function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse bg-surface-3 rounded ${className}`} />
  )
}

function StatCard({ label, value, sub, badge, badgeType = 'green', loading = false }) {
  return (
    <div className="card flex flex-col gap-2">
      <p className="stat-label">{label}</p>
      {loading ? (
        <>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </>
      ) : (
        <>
          <p className="stat-value">{value}</p>
          {sub && <p className="text-sm text-gray-500">{sub}</p>}
          {badge && (
            <span className={`badge-${badgeType} w-fit`}>{badge}</span>
          )}
        </>
      )}
    </div>
  )
}

function EthPriceCard({ market }) {
  const { ethPriceUSD, ethChange24h, loading, error, lastUpdated } = market
  const isPositive = ethChange24h >= 0
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400'
  const changeSign = isPositive ? '+' : ''

  // 실시간 ETH 가격 기반 총 보유가치
  const liveEthValue = ethPriceUSD
    ? (SNAPSHOT.ethHoldings * ethPriceUSD / 1_000_000_000).toFixed(1)
    : null

  return (
    <div className="card flex flex-col gap-2 relative">
      {/* 실시간 인디케이터 */}
      {!loading && !error && (
        <span className="absolute top-3 right-3 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-gray-600">LIVE</span>
        </span>
      )}

      <p className="stat-label">ETH 현재 가격</p>

      {loading ? (
        <>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-5 w-1/3 rounded-full" />
        </>
      ) : error ? (
        <>
          <p className="stat-value text-gray-500">
            ${SNAPSHOT.ethPriceUSD.toLocaleString()}
          </p>
          <p className="text-xs text-red-400">API 오류 — 공시값 표시 중</p>
        </>
      ) : (
        <>
          <p className="stat-value">${ethPriceUSD.toLocaleString()}</p>
          <p className={`text-sm font-medium ${changeColor}`}>
            {changeSign}{ethChange24h.toFixed(2)}% (24h)
          </p>
          {liveEthValue && (
            <span className="badge-green w-fit">보유가치 ${liveEthValue}B</span>
          )}
          {lastUpdated && (
            <p className="text-[10px] text-gray-700 mt-auto">
              {lastUpdated.toLocaleTimeString('ko-KR')} 업데이트
            </p>
          )}
        </>
      )}
    </div>
  )
}

function MNavCard({ mNAV, liveEthPrice }) {
  const displayPrice = liveEthPrice ?? SNAPSHOT.ethPriceUSD
  const color = mNAV >= 1.2 ? 'text-yellow-400' : mNAV >= 1.0 ? 'text-green-400' : 'text-red-400'
  const badgeType = mNAV >= 1.2 ? 'yellow' : mNAV >= 1.0 ? 'green' : 'red'
  const badgeText = mNAV >= 1.2 ? '프리미엄 구간' : mNAV >= 1.0 ? '적정 구간' : '할인 구간'

  return (
    <div className="card flex flex-col gap-2">
      <p className="stat-label">mNAV (주가 / 순자산)</p>
      <p className={`text-2xl font-bold ${color}`}>{mNAV.toFixed(2)}x</p>
      <p className="text-sm text-gray-500">ETH ${displayPrice.toLocaleString()} 기준</p>
      <span className={`badge-${badgeType} w-fit`}>{badgeText}</span>
      <p className="text-xs text-gray-600 mt-1">
        {mNAV < 1.0 && '⚠ 할인 구간: 신주 발행 시 기존 주주 희석 리스크'}
        {mNAV >= 1.0 && mNAV < 1.2 && '신주 발행 기반 ETH 매집 선순환 가능'}
        {mNAV >= 1.2 && '스토리 프리미엄 반영 — 5% 목표 기대감 포함'}
      </p>
    </div>
  )
}

function AlchemyBar({ current, target, pct }) {
  const remaining = Math.round(120_700_000 * target / 100) - SNAPSHOT.ethHoldings

  return (
    <div className="card col-span-full">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="stat-label">Alchemy of 5% — 매집 목표 진행률</p>
          <p className="text-xs text-gray-600 mt-0.5">전체 ETH 발행량 대비 보유 비율 목표 (총 발행량 1.207억개)</p>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-eth-blue">{current}%</span>
          <span className="text-gray-500 text-sm"> / {target}%</span>
        </div>
      </div>

      <div className="relative h-4 bg-surface-3 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #627EEA 0%, #8C7CF0 100%)',
          }}
        />
      </div>

      <div className="flex justify-between mt-2 text-xs text-gray-600">
        <span>0%</span>
        <span className="text-eth-purple font-medium">{pct.toFixed(1)}% 달성</span>
        <span>{target}% 목표</span>
      </div>

      <div className="mt-3 p-3 bg-surface-3 rounded-lg">
        <p className="text-xs text-gray-500">
          <span className="text-gray-400 font-medium">남은 물량 추산:</span>{' '}
          약 {remaining.toLocaleString()} ETH
          <span className="ml-2 text-gray-600">— 공시 10개월 만에 84.2% 달성</span>
        </p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const market = useMarketData()

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold text-white">실시간 대시보드</h2>
        <span className="text-xs text-gray-600 bg-surface-3 px-2 py-0.5 rounded">
          공시일: {SNAPSHOT.updatedAt}
        </span>
        <span className="badge-yellow">NYSE 공시 기준</span>
        {!market.loading && !market.error && (
          <span className="badge-green">ETH 실시간 연동</span>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
        <StatCard
          label="ETH 보유량"
          value={SNAPSHOT.ethHoldings.toLocaleString()}
          sub={`≈ $${(SNAPSHOT.ethHoldings * (market.ethPriceUSD ?? SNAPSHOT.ethPriceUSD) / 1_000_000_000).toFixed(1)}B USD`}
          badge={`발행량의 ${SNAPSHOT.ethSupplyPct}%`}
          badgeType="green"
        />
        <StatCard
          label="스테이킹 ETH"
          value={SNAPSHOT.stakedETH.toLocaleString()}
          sub={`보유량의 ${SNAPSHOT.stakedPct}%`}
          badge={`연 ${SNAPSHOT.stakingYield}% (BMNR 7일)`}
          badgeType="green"
        />
        <StatCard
          label="연간 스테이킹 수익"
          value={`$${(SNAPSHOT.annualStakingRevenueUSD / 1_000_000).toFixed(0)}M`}
          sub={`전량 스테이킹 시 $${(SNAPSHOT.annualStakingProjectedUSD / 1_000_000).toFixed(0)}M 추산`}
          badge="카운터파티 없는 이자"
          badgeType="green"
        />
        <EthPriceCard market={market} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
        <MNavCard mNAV={SNAPSHOT.mNAV} liveEthPrice={market.ethPriceUSD} />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <AlchemyBar
          current={ALCHEMY_PROGRESS.current}
          target={ALCHEMY_PROGRESS.target}
          pct={ALCHEMY_PROGRESS.pct}
        />
      </div>

      {/* 범례 */}
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> 복수 소스 확인
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" /> 단일 소스·추정
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> 확인 불가
        </span>
        <span className="ml-auto">ETH 가격: CoinGecko · 보유량: NYSE 공시 · 30초 자동갱신</span>
      </div>
    </section>
  )
}
