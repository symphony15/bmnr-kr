/**
 * BMNR-KR Cloudflare Worker
 * Yahoo Finance 프록시 — CORS 우회용 서버사이드 fetch
 * 배포: wrangler deploy
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

async function fetchStockPrice(ticker) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1m&range=1d`
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
    },
  })
  if (!res.ok) throw new Error(`Yahoo Finance HTTP ${res.status}`)
  const data = await res.json()
  const meta = data?.chart?.result?.[0]?.meta
  if (!meta) throw new Error('No data')
  return {
    ticker,
    price: meta.regularMarketPrice,
    previousClose: meta.previousClose,
    change: meta.regularMarketPrice - meta.previousClose,
    changePct: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose) * 100,
    currency: meta.currency,
    marketState: meta.marketState,
    updatedAt: new Date().toISOString(),
  }
}

export default {
  async fetch(request, env, ctx) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    const url = new URL(request.url)

    // /price?ticker=BMNR
    if (url.pathname === '/price') {
      const ticker = url.searchParams.get('ticker') ?? 'BMNR'
      // 허용 티커만 통과
      const allowed = ['BMNR', 'MSTR', 'SBET']
      if (!allowed.includes(ticker.toUpperCase())) {
        return new Response(JSON.stringify({ error: 'Ticker not allowed' }), {
          status: 400,
          headers: CORS_HEADERS,
        })
      }

      try {
        const data = await fetchStockPrice(ticker.toUpperCase())
        return new Response(JSON.stringify(data), {
          headers: {
            ...CORS_HEADERS,
            'Cache-Control': 'public, max-age=30', // 30초 캐시
          },
        })
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 502,
          headers: CORS_HEADERS,
        })
      }
    }

    // /health
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', ts: new Date().toISOString() }), {
        headers: CORS_HEADERS,
      })
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: CORS_HEADERS,
    })
  },
}
