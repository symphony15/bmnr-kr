import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { ACCUMULATION_DATA, SNAPSHOT } from '../data/bmnrData'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const eth = payload[0].value
    const usdValue = (eth * SNAPSHOT.ethPriceUSD / 1_000_000_000).toFixed(2)
    return (
      <div className="bg-surface-2 border border-border rounded-lg p-3 text-sm shadow-xl">
        <p className="text-gray-400 mb-1">{label}</p>
        <p className="text-white font-bold">{(eth / 1_000_000).toFixed(2)}M ETH</p>
        <p className="text-gray-500">≈ ${usdValue}B USD</p>
      </div>
    )
  }
  return null
}

export default function AccumulationChart() {
  return (
    <section>
      <div className="flex items-start justify-between mb-4 gap-2">
        <div>
          <h2 className="text-lg font-semibold text-white">누적 ETH 매집 현황</h2>
          <p className="text-xs text-gray-500 mt-0.5">SEC 8-K 공시 검증값 기준</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-gray-500">현재 총 보유</p>
          <p className="text-eth-blue font-bold text-base sm:text-lg">
            {(SNAPSHOT.ethHoldings / 1_000_000).toFixed(2)}M ETH
          </p>
        </div>
      </div>

      <div className="card">
        {/* 모바일: 200px, 데스크탑: 280px */}
        <ResponsiveContainer width="100%" height={220} className="sm:!h-[280px]">
          <AreaChart data={ACCUMULATION_DATA} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="ethGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#627EEA" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#627EEA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3e" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#6b7280', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
              width={38}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={SNAPSHOT.ethHoldings}
              stroke="#8C7CF0"
              strokeDasharray="4 4"
              label={{ value: '현재', fill: '#8C7CF0', fontSize: 10, position: 'insideTopRight' }}
            />
            <Area
              type="monotone"
              dataKey="eth"
              stroke="#627EEA"
              strokeWidth={2}
              fill="url(#ethGradient)"
              dot={false}
              activeDot={{ r: 4, fill: '#8C7CF0' }}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="mt-3 pt-3 border-t border-border grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs text-gray-500">출범</p>
            <p className="text-xs sm:text-sm font-semibold text-white">2025.07</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">10개월 매집</p>
            <p className="text-xs sm:text-sm font-semibold text-eth-blue">5.08M ETH</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">세계 최대 ETH 보유</p>
            <p className="text-xs sm:text-sm font-semibold text-bmnr-green">#1 Treasury</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-2">
        🟢 SEC EDGAR 8-K + PR Newswire 공시 검증값. 미공시 구간은 데이터 없음.
      </p>
    </section>
  )
}
