import { useState, useEffect, useCallback } from 'react'

const ETH_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true'

// BMNR 주가: CoinGecko 무료 API는 주식 미지원
// Yahoo Finance는 CORS 차단 → 별도 프록시 없이는 브라우저에서 직접 호출 불가
// 현재는 bmnrData.js 수동값 fallback, 추후 프록시 서버 붙이면 교체
const REFRESH_INTERVAL = 30_000

export function useMarketData() {
  const [data, setData] = useState({
    ethPriceUSD: null,
    ethChange24h: null,
    loading: true,
    error: null,
    lastUpdated: null,
  })

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(ETH_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()

      setData({
        ethPriceUSD: json.ethereum.usd,
        ethChange24h: json.ethereum.usd_24h_change,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      })
    } catch (err) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: err.message,
      }))
    }
  }, [])

  useEffect(() => {
    fetchData()
    const timer = setInterval(fetchData, REFRESH_INTERVAL)
    return () => clearInterval(timer)
  }, [fetchData])

  return data
}
