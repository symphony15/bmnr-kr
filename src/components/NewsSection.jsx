import { useState } from 'react'

// Make Webhook으로 받을 뉴스 데이터 구조
// 실제 운영 시: POST /api/news 엔드포인트 → localStorage or Supabase 저장
// 현재는 초기 더미 데이터로 시작
const INITIAL_NEWS = {
  bmnr: [
    {
      id: 1,
      date: '2026-04-27',
      title: 'Bitmine ETH 보유량 세계 신기록 508만개 돌파 발표',
      summary: 'NYSE BMNR, PR Newswire 통해 5,078,386 ETH 보유 공식 발표. 총 자산 $133억. 전체 발행량의 4.21%.',
      source: 'PR Newswire',
      url: 'https://www.prnewswire.com',
      tag: '공시',
    },
    {
      id: 2,
      date: '2026-04-09',
      title: 'BMNR NYSE 업리스팅 완료',
      summary: 'NYSE American에서 NYSE 본거래소로 업리스팅. 기관 접근성 확대, 일 거래대금 $8.45억.',
      source: 'NYSE',
      url: 'https://www.nyse.com',
      tag: '공시',
    },
    {
      id: 3,
      date: '2026-03-15',
      title: 'MAVAN (Made in America VAlidator Network) 런칭',
      summary: '자체 이더리움 스테이킹 인프라 출시. 현재 연간 수익 $264M, 전량 스테이킹 시 $363M 추산.',
      source: 'Bitmine',
      url: 'https://bitminetech.io',
      tag: '사업',
    },
  ],
  crypto: [
    {
      id: 4,
      date: '2026-04-26',
      title: 'ETH, 이란전쟁 이후 S&P500 대비 +1,696bp 아웃퍼폼',
      summary: '전쟁 발발 이후 ETH가 전 세계 자산 중 원유 다음으로 가장 좋은 수익률 기록. 디지털 안전자산 내러티브 강화.',
      source: 'Fundstrat (Tom Lee)',
      url: '',
      tag: '시장',
    },
    {
      id: 5,
      date: '2026-04-20',
      title: 'CLARITY 법안 위원회 검토 진입',
      summary: 'DeFi 규제 명확화 + 토큰 증권 분류 기준 구체화. ETH 기관 담보자산 편입 경로 열릴 수 있음.',
      source: '비욘드로스 분석',
      url: '',
      tag: '규제',
    },
  ],
}

const TAG_COLORS = {
  공시: 'badge-green',
  사업: 'badge-green',
  시장: 'badge-yellow',
  규제: 'badge-yellow',
  리스크: 'badge-red',
}

function NewsCard({ item }) {
  return (
    <article className="card hover:border-eth-blue/30 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`${TAG_COLORS[item.tag] ?? 'badge-yellow'}`}>{item.tag}</span>
          <span className="text-xs text-gray-600">{item.source}</span>
        </div>
        <span className="text-xs text-gray-600 shrink-0">{item.date}</span>
      </div>
      <h3 className="text-sm font-semibold text-white leading-snug mb-1">
        {item.url ? (
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-eth-blue transition-colors">
            {item.title} ↗
          </a>
        ) : item.title}
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed">{item.summary}</p>
    </article>
  )
}

// Make Webhook 수신 구조
// Make 시나리오: HTTP → Parse JSON → POST to /api/news (또는 localStorage)
// 데이터 포맷:
// { type: 'bmnr' | 'crypto', title, summary, source, url, tag, date }
function WebhookInfo() {
  const [show, setShow] = useState(false)
  return (
    <div className="mt-3">
      <button
        onClick={() => setShow(v => !v)}
        className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
      >
        {show ? '▼' : '▶'} Make Webhook 연동 안내
      </button>
      {show && (
        <div className="mt-2 p-3 bg-surface-3 rounded-lg text-xs text-gray-500 space-y-1">
          <p><span className="text-gray-400">엔드포인트:</span> 현재 localStorage 기반 (서버 불필요)</p>
          <p><span className="text-gray-400">Make 시나리오:</span> RSS/Twitter → HTTP Module → POST JSON</p>
          <p><span className="text-gray-400">필드:</span> type, title, summary, source, url, tag, date</p>
          <p className="text-gray-600 mt-2">Supabase 연동 시 실시간 구독 가능. 현재는 수동 업데이트.</p>
        </div>
      )}
    </div>
  )
}

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState('bmnr')

  // localStorage에서 추가된 뉴스 병합 (Make Webhook 수신용)
  const getNews = (type) => {
    try {
      const stored = JSON.parse(localStorage.getItem(`news_${type}`) ?? '[]')
      const combined = [...stored, ...INITIAL_NEWS[type]]
      return combined.sort((a, b) => new Date(b.date) - new Date(a.date))
    } catch {
      return INITIAL_NEWS[type]
    }
  }

  const news = getNews(activeTab)

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">뉴스 & 업데이트</h2>
        <span className="text-xs text-gray-600">수동 큐레이션</span>
      </div>

      {/* 탭 */}
      <div className="flex gap-1 mb-4 bg-surface-2 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('bmnr')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'bmnr'
              ? 'bg-eth-blue text-white'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          BMNR 소식
        </button>
        <button
          onClick={() => setActiveTab('crypto')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'crypto'
              ? 'bg-eth-blue text-white'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          ETH / 크립토
        </button>
      </div>

      {/* 뉴스 목록 */}
      <div className="flex flex-col gap-3">
        {news.length === 0 ? (
          <div className="card text-center text-gray-500 text-sm py-8">
            등록된 뉴스가 없습니다.
          </div>
        ) : (
          news.map(item => <NewsCard key={item.id} item={item} />)
        )}
      </div>

      <WebhookInfo />
    </section>
  )
}
