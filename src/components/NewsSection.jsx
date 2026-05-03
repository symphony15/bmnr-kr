import { useState, useEffect } from 'react'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

// 로컬 fallback (Firestore 데이터 없을 때)
const FALLBACK_NEWS = {
  bmnr: [
    {
      id: 'f1',
      date: '2026-04-27',
      title: 'Bitmine ETH 보유량 세계 신기록 508만개 돌파 발표',
      summary: 'NYSE BMNR, PR Newswire 통해 5,078,386 ETH 보유 공식 발표. 총 자산 $133억. 전체 발행량의 4.21%.',
      source: 'PR Newswire',
      url: 'https://www.prnewswire.com',
      tag: '공시',
      type: 'bmnr',
    },
    {
      id: 'f2',
      date: '2026-04-09',
      title: 'BMNR NYSE 업리스팅 완료',
      summary: 'NYSE American에서 NYSE 본거래소로 업리스팅. 기관 접근성 확대, 일 거래대금 $8.45억.',
      source: 'NYSE',
      url: '',
      tag: '공시',
      type: 'bmnr',
    },
  ],
  crypto: [
    {
      id: 'f3',
      date: '2026-04-26',
      title: 'ETH, 이란전쟁 이후 S&P500 대비 +1,696bp 아웃퍼폼',
      summary: '전쟁 발발 이후 ETH가 전 세계 자산 중 원유 다음으로 가장 좋은 수익률 기록.',
      source: 'Fundstrat',
      url: '',
      tag: '시장',
      type: 'crypto',
    },
  ],
}

const TAG_COLORS = {
  공시: 'badge-green',
  사업: 'badge-green',
  시장: 'badge-yellow',
  규제: 'badge-yellow',
  분석: 'badge-yellow',
  리스크: 'badge-red',
}

function NewsCard({ item }) {
  return (
    <article className="card hover:border-eth-blue/30 transition-colors">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={TAG_COLORS[item.tag] ?? 'badge-yellow'}>{item.tag}</span>
          <span className="text-xs text-gray-600">{item.source}</span>
        </div>
        <span className="text-xs text-gray-600 shrink-0">{item.date?.slice(0, 10)}</span>
      </div>
      <h3 className="text-sm font-semibold text-white leading-snug mb-1">
        {item.url ? (
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-eth-blue transition-colors">
            {item.title} ↗
          </a>
        ) : item.title}
      </h3>
      {item.summary && (
        <p className="text-xs text-gray-500 leading-relaxed">{item.summary}</p>
      )}
    </article>
  )
}

function EmptyState() {
  return (
    <div className="card text-center text-gray-500 text-sm py-8">
      등록된 뉴스가 없습니다.
    </div>
  )
}

export default function NewsSection() {
  const [activeTab, setActiveTab] = useState('bmnr')
  const [firestoreNews, setFirestoreNews] = useState([])
  const [loading, setLoading] = useState(true)

  // Firestore 실시간 구독
  useEffect(() => {
    const q = query(
      collection(db, 'news'),
      orderBy('date', 'desc'),
      limit(30)
    )

    const unsub = onSnapshot(q,
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setFirestoreNews(items)
        setLoading(false)
      },
      (err) => {
        console.error('Firestore 구독 오류:', err)
        setLoading(false)
      }
    )

    return () => unsub()
  }, [])

  // Firestore 데이터 있으면 사용, 없으면 fallback
  const getNews = (type) => {
    const fromFirestore = firestoreNews.filter(n => n.type === type)
    if (fromFirestore.length > 0) return fromFirestore
    return FALLBACK_NEWS[type] ?? []
  }

  const news = getNews(activeTab)
  const bmnrCount = firestoreNews.filter(n => n.type === 'bmnr').length
  const cryptoCount = firestoreNews.filter(n => n.type === 'crypto').length

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">뉴스 & 업데이트</h2>
        <div className="flex items-center gap-2">
          {!loading && firestoreNews.length > 0 && (
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-gray-600">실시간</span>
            </span>
          )}
          {loading && (
            <span className="text-xs text-gray-600">불러오는 중...</span>
          )}
        </div>
      </div>

      {/* 탭 */}
      <div className="flex gap-1 mb-4 bg-surface-2 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('bmnr')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'bmnr' ? 'bg-eth-blue text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          BMNR 소식
          {bmnrCount > 0 && (
            <span className="text-[10px] bg-white/20 px-1 rounded">{bmnrCount}</span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('crypto')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
            activeTab === 'crypto' ? 'bg-eth-blue text-white' : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          ETH / 크립토
          {cryptoCount > 0 && (
            <span className="text-[10px] bg-white/20 px-1 rounded">{cryptoCount}</span>
          )}
        </button>
      </div>

      {/* 뉴스 목록 */}
      <div className="flex flex-col gap-3">
        {news.length === 0 ? <EmptyState /> : news.map(item => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>

      {/* Make 연동 안내 */}
      <div className="mt-3 p-3 bg-surface-3 rounded-lg">
        <p className="text-xs text-gray-600">
          <span className="text-gray-500">Make 연동 포맷:</span>{' '}
          Firestore &gt; Create Document &gt; Collection: <code className="text-eth-blue">news</code>{' '}
          · 필드: <code className="text-gray-400">type, title, summary, source, url, tag, date</code>
        </p>
      </div>
    </section>
  )
}
