import { COMMENTARY } from '../data/bmnrData'

const CONFIDENCE_MAP = {
  green: { dot: 'bg-green-500', text: '🟢 높음', border: 'border-green-500/20', bg: 'bg-green-500/5' },
  yellow: { dot: 'bg-yellow-500', text: '🟡 중간', border: 'border-yellow-500/20', bg: 'bg-yellow-500/5' },
  red: { dot: 'bg-red-500', text: '🔴 낮음', border: 'border-red-500/20', bg: 'bg-red-500/5' },
}

function CommentaryCard({ item, isLatest }) {
  const conf = CONFIDENCE_MAP[item.confidence]

  return (
    <article className={`card border ${conf.border} ${isLatest ? conf.bg : ''} relative`}>
      {isLatest && (
        <span className="absolute top-4 right-4 badge-green text-[10px]">최신</span>
      )}

      <div className="flex items-start gap-3 mb-3">
        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${conf.dot}`} />
        <div>
          <p className="text-xs text-gray-500">{item.week} · {item.date}</p>
          <h3 className="text-base font-semibold text-white mt-0.5">{item.title}</h3>
        </div>
      </div>

      <div className="pl-5">
        <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
          {item.body.split('\n').map((line, i) => {
            if (line.startsWith('[사실]')) {
              return <p key={i} className="text-green-400/90 my-1">{line}</p>
            }
            if (line.startsWith('[해석]')) {
              return <p key={i} className="text-yellow-400/90 my-1">{line}</p>
            }
            if (line.startsWith('[불명]') || line.startsWith('[주의]')) {
              return <p key={i} className="text-red-400/80 my-1">{line}</p>
            }
            return <p key={i} className="my-1">{line}</p>
          })}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {item.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-surface-3 text-gray-500 rounded-full border border-border">
              #{tag}
            </span>
          ))}
          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full border ${conf.border} text-gray-500`}>
            확신도 {conf.text}
          </span>
        </div>
      </div>
    </article>
  )
}

export default function Commentary() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-white">비스의 주간 분석</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            매주 업데이트 — 투자 권유 아님, 개인 분석 기록
          </p>
        </div>
        <a
          href="https://youtube.com/@비욘드로스"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-eth-blue hover:text-eth-purple transition-colors flex items-center gap-1"
        >
          비욘드로스 채널 →
        </a>
      </div>

      <div className="flex flex-col gap-4">
        {COMMENTARY.map((item, i) => (
          <CommentaryCard key={item.id} item={item} isLatest={i === 0} />
        ))}
      </div>

      <div className="mt-4 p-4 card border-yellow-500/20 bg-yellow-500/5">
        <p className="text-xs text-yellow-400/80 leading-relaxed">
          ⚠ 이 사이트의 모든 내용은 투자 권유가 아닌 개인 분석 기록입니다.
          BMNR 관련 투자 결정은 본인의 책임 하에 이루어져야 합니다.
          수치는 SEC 공시 기반이지만 실시간이 아닌 수동 업데이트입니다.
        </p>
      </div>
    </section>
  )
}
