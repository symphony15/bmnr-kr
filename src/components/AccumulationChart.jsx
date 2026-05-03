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
    const usdValue = (eth * SNAPSHOT.ethPriceUSD / 1_000_000).toFixed(0)
    return (
      <div className="bg-surface-2 border border-border rounded-lg p-3 text-sm shadow-xl">
        <p className="text-gray-400 mb-1">{label}</p>
        <p className="text-white font-bold">{eth.toLocaleString()} ETH</p>
        <p className="text-gray-500">≈ ${usdValue}M USD</p>
      </div>
    )
  }
  return null
}

export default function AccumulationChart() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">누적 ETH 매집 현황</h2>
          <p className="text-xs text-gray-500 mt-0.5">2024년 7월 출범 이후 월별 누적 보유량</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">현재 총 보유</p>
          <p className="text-eth-blue font-bold text-lg">{SNAPSHOT.ethHoldings.toLocaleString()} ETH</p>
        </div>
      </div>

      <div className="card">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={ACCUMULATION_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="ethGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#627EEA" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#627EEA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2d3e" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={SNAPSHOT.ethHoldings}
              stroke="#8C7CF0"
              strokeDasharray="4 4"
              label={{ value: '현재', fill: '#8C7CF0', fontSize: 11, position: 'right' }}
            />
            <Area
              type="monotone"
              dataKey="eth"
              stroke="#627EEA"
              strokeWidth={2}
              fill="url(#ethGradient)"
              dot={{ fill: '#627EEA', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#8C7CF0' }}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="mt-3 pt-3 border-t border-border grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xs text-gray-500">출범 시점</p>
            <p className="text-sm font-semibold text-white">2024.07</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">10개월 매집</p>
            <p className="text-sm font-semibold text-eth-blue">+{SNAPSHOT.ethHoldings.toLocaleString()} ETH</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">이더리움 재단보다 많음</p>
            <p className="text-sm font-semibold text-bmnr-green">단일 최대 보유</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-2">
        🟡 월별 집계 데이터. 정확한 주간 단위는 SEC 8-K 공시 기준으로 업데이트 예정.
      </p>
    </section>
  )
}
