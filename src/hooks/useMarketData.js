import { useState, useEffect, useCallback } from 'react'

const ETH_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true'

// Cloudflare Worker 배포 후 실제 URL로 교체
// 예: https://bmnr-kr-proxy.symphony15.workers.dev
const WORKER_URL = import.meta.env.VITE_WORKER_URL ?? ''

const REFRESH_INTERVAL = 30_000


export function useMarketData() {
  const [eth, setEth] = useState({
    price: null,
    change24h: null,
    loading: true,
    error: null,
    lastUpdated: null,
  })

  const [bmnr, setBmnr] = useState({
    price: null,
    change: null,
    changePct: null,
    marketState: null,
    loading: Boolean(WORKER_URL), // Worker URL 없으면 처음부터 로딩 안 함
    error: null,
    lastUpdated: null,
  })

  // ETH 가격 (CoinGecko)
  const fetchEth = useCallback(async () => {
    try {
      const res = await fetch(ETH_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setEth({
        price: json.ethereum.usd,
        change24h: json.ethereum.usd_24h_change,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      })
    } catch (err) {
      setEth(prev => ({ ...prev, loading: false, error: err.message }))
    }
  }, [])

  // BMNR 주가 (Cloudflare Worker 프록시)
  const fetchBmnr = useCallback(async () => {
    if (!WORKER_URL) return
    try {
      const res = await fetch(`${WORKER_URL}/price?ticker=BMNR`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setBmnr({
        price: json.price,
        change: json.change,
        changePct: json.changePct,
        marketState: json.marketState,
        loading: false,
        error: null,
        lastUpdated: new Date(),
      })
    } catch (err) {
      setBmnr(prev => ({ ...prev, loading: false, error: err.message }))
    }
  }, [])

  useEffect(() => {
    fetchEth()
    fetchBmnr()
    const timer = setInterval(() => {
      fetchEth()
      fetchBmnr()
    }, REFRESH_INTERVAL)
    return () => clearInterval(timer)
  }, [fetchEth, fetchBmnr])

  return { eth, bmnr, WORKER_URL }
}
