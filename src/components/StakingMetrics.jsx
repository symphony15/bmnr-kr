import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

const YIELD_HISTORY = [
  { date: '2026-02-22', mavan: 2.89, cesr: 2.81, label: '02.22' },
  { date: '2026-03-01', mavan: 2.86, cesr: 2.83, label: '03.01' },
  { date: '2026-03-08', mavan: 2.91, cesr: 2.84, label: '03.08' },
  { date: '2026-03-15', mavan: 2.81, cesr: 2.79, label: '03.15' },
  { date: '2026-04-05', mavan: 2.78, cesr: 2.74, label: '04.05' },
  { date: '2026-04-12', mavan: 2.89, cesr: 2.73, label: '04.12' },
  { date: '2026-04-19', mavan: 2.88, cesr: 2.76, label: '04.19' },
  { date: '2026-04-26', mavan: 2.88, cesr: 2.76, label: '04.26' },
]

const ANNUAL_REVENUE = 264_000_000
const PROJECTED_REVENUE = 363_000_000
const DAILY = Math.round(ANNUAL_REVENUE / 365)
const HOURLY = Math.round(DAILY / 24)
const ADDITIONAL = PROJECTED_REVENUE - ANNUAL_REVENUE  // $99M

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  const mavan = payload.find(p => p.dataKey === 'mavan')
  const cesr = payload.find(p => p.dataKey === 'cesr')
  const alpha = mavan && cesr ? (mavan.value - cesr.value).toFixed(2) : null

  return (
    <div className="bg-surface-2 border border-border rounded-lg p-3 text-sm shadow-xl">
      <p className="text-gray-400 mb-2">{label}</p>
      {mavan && (
        <p className="text-eth-blue font-semibold">MAVAN {mavan.value.toFixed(2)}%</p>
      )}
      {cesr && (
        <p className="text-gray-400">CESR {cesr.value.toFixed(2)}%</p>
      )}
      {alpha && (
        <p className="text-green-400 text-xs mt-1">알파 +{alpha}bp</p>
      )}
    </div>
  )
}

function YieldCard({ label, value, sub, highlight = false }) {
  return (
    <div className={`card flex flex-col gap-2 ${highlight ? 'border-eth-blue/40' : ''}`}>
      <p className="stat-label">{label}</p>
      <p className={`text-2xl font-bold ${highlight ? 'text-eth-blue' : 'text-white'}`}>
        {value}
      </p>
      {sub && <p className="text-sm text-gray-500">{sub}</p>}
    </div>
  )
}

function DailyBreakdown() {
  return (
    <div className="card">
      <p className="stat-label mb-3">일별 수익 환산</p>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-surface-3 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">연간</p>
          <p className="text-lg font-bold text-white">$264M</p>
          <p className="text-xs text-gray-600">$264,000,000/yr</p>
        </div>
        <div className="text-center p-3 bg-surface-3 rounded-lg border border-eth-blue/20">
          <p className="text-xs text-gray-500 mb-1">일간</p>
          <p className="text-lg font-bold text-eth-blue">${DAILY.toLocaleString()}</p>
          <p className="text-xs text-gray-600">$264M ÷ 365</p>
        </div>
        <div className="text-center p-3 bg-surface-3 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">시간당</p>
          <p className="text-lg font-bold text-eth-purple">${HOURLY.toLocaleString()}</p>
          <p className="text-xs text-gray-600">${DAILY.toLocaleString()} ÷ 24</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 mt-3">
        🟡 연간 수익 $264M 기준 단순 환산. 실제 수익은 ETH 가격·스테이킹 비율 변동에 따라 달라짐.
      </p>
    </div>
  )
}

function FullStakingBar() {
  const currentPct = 72.89
  const targetPct = 100

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="stat-label">풀 스테이킹 시나리오</p>
          <p className="text-xs text-gray-600 mt-0.5">현재 72.89% → 목표 100% 스테이킹</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">추가 가능 수익</p>
          <p className="text-lg font-bold text-bmnr-green">+$99M/년</p>
        </div>
      </div>

      <div className="relative h-3 bg-surface-3 rounded-full overflow-hidden mb-2">
        {/* 현재 스테이킹 */}
        <div
          className="absolute h-full rounded-full"
          style={{
            width: `${currentPct}%`,
            background: 'linear-gradient(90deg, #627EEA 0%, #8C7CF0 100%)',
          }}
        />
        {/* 추가 가능 구간 */}
        <div
          className="absolute h-full rounded-full opacity-30"
          style={{
            left: `${currentPct}%`,
            width: `${targetPct - currentPct}%`,
            background: '#22c55e',
          }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-600 mb-4">
        <span>0%</span>
        <span className="text-eth-purple font-medium">현재 {currentPct}%</span>
        <span className="text-green-500">목표 100%</span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <div className="p-2 bg-surface-3 rounded-lg">
          <p className="text-xs text-gray-500 mb-0.5">현재 수익</p>
          <p className="font-semibold text-white">$264M</p>
        </div>
        <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-xs text-gray-500 mb-0.5">추가 가능</p>
          <p className="font-semibold text-green-400">+$99M</p>
        </div>
        <div className="p-2 bg-surface-3 rounded-lg">
          <p className="text-xs text-gray-500 mb-0.5">풀 스테이킹 시</p>
          <p className="font-semibold text-white">$363M</p>
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-3">
        🟡 추산값. MAVAN 수익률 3.033% + 미스테이킹 ETH 전환 가정. 실제 큐 딜레이·리스크 포함 안 됨.
      </p>
    </div>
  )
}

export default function StakingMetrics() {
  // 최신 데이터의 알파 계산
  const latest = YIELD_HISTORY[YIELD_HISTORY.length - 1]
  const alphaBp = Math.round((latest.mavan - latest.cesr) * 100)

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold text-white">스테이킹 수익 분석</h2>
        <span className="text-xs text-gray-600 bg-surface-3 px-2 py-0.5 rounded">
          MAVAN · 2026-04-26
        </span>
        <span className="badge-green">시장평균 +{alphaBp}bp</span>
      </div>

      {/* 상단 카드 3개 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <YieldCard
          label="MAVAN 7일 수익률"
          value={`${latest.mavan.toFixed(2)}%`}
          sub={`시장평균 대비 +${alphaBp}bp 아웃퍼폼`}
          highlight
        />
        <YieldCard
          label="CESR (시장평균)"
          value={`${latest.cesr.toFixed(2)}%`}
          sub="Composite Ethereum Staking Rate"
        />
        <YieldCard
          label="현재 연간 수익"
          value="$264M"
          sub="풀 스테이킹 시 $363M 추산"
        />
      </div>

      {/* 일별 수익 환산 */}
      <div className="mb-4">
        <DailyBreakdown />
      </div>

      {/* MAVAN vs CESR 차트 */}
      <div className="card mb-4">
        <p className="stat-label mb-4">MAVAN vs CESR 수익률 추이</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={YIELD_HISTORY} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3e" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[2.6, 3.0]}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `${v.toFixed(2)}%`}
              width={48}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }}
              formatter={(value) => value === 'mavan' ? 'MAVAN' : 'CESR'}
            />
            <ReferenceLine y={latest.cesr} stroke="#6b7280" strokeDasharray="4 4" strokeOpacity={0.4} />
            <Line
              type="monotone"
              dataKey="cesr"
              stroke="#4b5563"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={{ fill: '#4b5563', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="mavan"
              stroke="#627EEA"
              strokeWidth={2}
              dot={{ fill: '#627EEA', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#8C7CF0' }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-600 mt-2">
          🟡 MAVAN 수익률은 비트마인 공시 기준. CESR은 Quatrefoil 집계.
        </p>
      </div>

      {/* 풀 스테이킹 시나리오 */}
      <FullStakingBar />
    </section>
  )
}
