import { useState, useEffect } from 'react'
import { COMMENTARY, SNAPSHOT } from '../data/bmnrData'
import { recordCurrentSnapshot } from '../utils/recordMnav.js'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'bmnr2026'

// localStorage 키
const DRAFTS_KEY = 'admin_drafts'
const APPROVED_KEY = 'admin_approved'

function useAdminData() {
  const [drafts, setDrafts] = useState([])
  const [approved, setApproved] = useState([])

  useEffect(() => {
    try {
      setDrafts(JSON.parse(localStorage.getItem(DRAFTS_KEY) ?? '[]'))
      setApproved(JSON.parse(localStorage.getItem(APPROVED_KEY) ?? '[]'))
    } catch { /* ignore */ }
  }, [])

  const saveDrafts = (items) => {
    setDrafts(items)
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(items))
  }

  const saveApproved = (items) => {
    setApproved(items)
    localStorage.setItem(APPROVED_KEY, JSON.stringify(items))
  }

  const approveDraft = (id) => {
    const draft = drafts.find(d => d.id === id)
    if (!draft) return
    const newApproved = [{ ...draft, approvedAt: new Date().toISOString(), status: 'approved' }, ...approved]
    const newDrafts = drafts.filter(d => d.id !== id)
    saveApproved(newApproved)
    saveDrafts(newDrafts)
  }

  const deleteDraft = (id) => saveDrafts(drafts.filter(d => d.id !== id))

  const addDraft = (draft) => {
    const item = { ...draft, id: Date.now(), createdAt: new Date().toISOString(), status: 'draft' }
    saveDrafts([item, ...drafts])
  }

  const updateDraft = (id, patch) => {
    saveDrafts(drafts.map(d => d.id === id ? { ...d, ...patch } : d))
  }

  return { drafts, approved, approveDraft, deleteDraft, addDraft, updateDraft }
}

const CONFIDENCE_OPTIONS = [
  { value: 'green', label: '🟢 높음' },
  { value: 'yellow', label: '🟡 중간' },
  { value: 'red', label: '🔴 낮음' },
]

function DraftCard({ draft, onApprove, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ title: draft.title, body: draft.body, confidence: draft.confidence })

  const handleSave = () => {
    onEdit(draft.id, form)
    setEditing(false)
  }

  return (
    <div className="card border-yellow-500/20 bg-yellow-500/5">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <span className="badge-yellow text-[10px]">초안</span>
          <span className="text-xs text-gray-600 ml-2">{draft.createdAt?.slice(0, 10)}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setEditing(v => !v)}
            className="text-xs text-gray-500 hover:text-white px-2 py-1 bg-surface-3 rounded transition-colors"
          >
            {editing ? '취소' : '수정'}
          </button>
          <button
            onClick={() => onDelete(draft.id)}
            className="text-xs text-red-400 hover:text-red-300 px-2 py-1 bg-red-500/10 rounded transition-colors"
          >
            삭제
          </button>
          <button
            onClick={() => onApprove(draft.id)}
            className="text-xs text-green-400 hover:text-green-300 px-2 py-1 bg-green-500/20 rounded font-medium transition-colors"
          >
            ✓ 승인
          </button>
        </div>
      </div>

      {editing ? (
        <div className="space-y-3">
          <input
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="w-full bg-surface-3 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-eth-blue"
            placeholder="제목"
          />
          <select
            value={form.confidence}
            onChange={e => setForm(f => ({ ...f, confidence: e.target.value }))}
            className="bg-surface-3 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none"
          >
            {CONFIDENCE_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <textarea
            value={form.body}
            onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
            rows={8}
            className="w-full bg-surface-3 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-eth-blue font-mono resize-y"
            placeholder="본문 ([사실] [해석] [주의] 형식 권장)"
          />
          <button
            onClick={handleSave}
            className="text-sm px-4 py-2 bg-eth-blue text-white rounded hover:bg-eth-purple transition-colors"
          >
            저장
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-sm font-semibold text-white mb-2">{draft.title}</h3>
          <p className="text-xs text-gray-500 leading-relaxed whitespace-pre-line line-clamp-4">{draft.body}</p>
        </>
      )}
    </div>
  )
}

function ApprovedCard({ item }) {
  return (
    <div className="card border-green-500/20 bg-green-500/5">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="badge-green text-[10px]">승인됨</span>
        <span className="text-xs text-gray-600">{item.approvedAt?.slice(0, 10)}</span>
      </div>
      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
    </div>
  )
}

function AddDraftForm({ onAdd }) {
  const [form, setForm] = useState({ title: '', body: '', confidence: 'yellow', week: '', date: new Date().toISOString().slice(0, 10) })
  const [open, setOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onAdd(form)
    setForm({ title: '', body: '', confidence: 'yellow', week: '', date: new Date().toISOString().slice(0, 10) })
    setOpen(false)
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 text-sm px-4 py-2 bg-eth-blue text-white rounded-lg hover:bg-eth-purple transition-colors"
      >
        + 새 코멘터리 초안 작성
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="mt-3 card space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              type="date"
              className="bg-surface-3 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-eth-blue"
            />
            <input
              value={form.week}
              onChange={e => setForm(f => ({ ...f, week: e.target.value }))}
              placeholder="주차 (예: 2026년 18주차)"
              className="bg-surface-3 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-eth-blue"
            />
          </div>
          <input
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            placeholder="제목"
            required
            className="w-full bg-surface-3 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-eth-blue"
          />
          <select
            value={form.confidence}
            onChange={e => setForm(f => ({ ...f, confidence: e.target.value }))}
            className="bg-surface-3 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none"
          >
            {CONFIDENCE_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <textarea
            value={form.body}
            onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
            rows={10}
            placeholder="본문&#10;&#10;[사실] 복수 소스 확인된 내용&#10;[해석] 분석 및 해석&#10;[주의] 리스크 또는 불확실성"
            className="w-full bg-surface-3 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-eth-blue font-mono resize-y"
          />
          <div className="flex gap-2">
            <button type="submit" className="text-sm px-4 py-2 bg-eth-blue text-white rounded hover:bg-eth-purple transition-colors">
              초안 저장
            </button>
            <button type="button" onClick={() => setOpen(false)} className="text-sm px-4 py-2 bg-surface-3 text-gray-400 rounded hover:text-white transition-colors">
              취소
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

function MnavRecorder() {
  const [status, setStatus] = useState(null) // null | 'loading' | 'ok' | 'error'

  const handleRecord = async () => {
    setStatus('loading')
    try {
      await recordCurrentSnapshot()
      setStatus('ok')
    } catch (e) {
      console.error(e)
      setStatus('error')
    }
  }

  return (
    <section className="mb-10">
      <h2 className="text-base font-semibold text-white mb-3">
        mNAV 히스토리 기록
        <span className="text-xs text-gray-600 font-normal ml-2">Firestore mnav_history</span>
      </h2>
      <div className="card space-y-3">
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-400">
          <span>날짜: <span className="text-white">{SNAPSHOT.dataDate}</span></span>
          <span>mNAV: <span className="text-white">{SNAPSHOT.mNAV}</span></span>
          <span>ETH 가격: <span className="text-white">${SNAPSHOT.ethPriceUSD.toLocaleString()}</span></span>
          <span>BMNR 주가: <span className="text-white">${SNAPSHOT.stockPriceUSD}</span></span>
          <span>ETH 보유: <span className="text-white">{SNAPSHOT.ethHoldings.toLocaleString()}</span></span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRecord}
            disabled={status === 'loading'}
            className="text-sm px-4 py-2 bg-eth-blue text-white rounded hover:bg-eth-purple transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? '기록 중…' : 'Firestore에 기록'}
          </button>
          {status === 'ok' && <span className="text-xs text-green-400">✓ 기록 완료</span>}
          {status === 'error' && <span className="text-xs text-red-400">❌ 오류 발생 — 콘솔 확인</span>}
        </div>
        <p className="text-xs text-gray-600">
          date({SNAPSHOT.dataDate})를 document ID로 사용. 같은 날짜 재기록 시 덮어씀(merge).
        </p>
      </div>
    </section>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const { drafts, approved, approveDraft, deleteDraft, addDraft, updateDraft } = useAdminData()

  const handleLogin = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-10 h-10 rounded-xl bg-eth-blue/20 flex items-center justify-center mx-auto mb-3">
              <span className="text-eth-blue text-lg font-bold">B</span>
            </div>
            <h1 className="text-lg font-bold text-white">BMNR-KR Admin</h1>
            <p className="text-xs text-gray-600 mt-1">코멘터리 관리 패널</p>
          </div>
          <form onSubmit={handleLogin} className="card space-y-3">
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="비밀번호"
              className="w-full bg-surface-3 border border-border rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-eth-blue"
              autoFocus
            />
            {error && <p className="text-xs text-red-400">비밀번호가 틀렸습니다.</p>}
            <button type="submit" className="w-full py-2 bg-eth-blue text-white rounded text-sm font-medium hover:bg-eth-purple transition-colors">
              로그인
            </button>
          </form>
          <p className="text-center text-xs text-gray-700 mt-4">
            기본 비밀번호: .env VITE_ADMIN_PASSWORD
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-surface-2">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-gray-500 hover:text-white text-sm transition-colors">← 메인</a>
            <span className="text-gray-700">|</span>
            <span className="text-sm font-medium text-white">Admin 패널</span>
          </div>
          <button onClick={() => setAuthed(false)} className="text-xs text-gray-600 hover:text-gray-400">
            로그아웃
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">

        {/* 코멘터리 초안 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4">코멘터리 초안 관리</h2>
          <AddDraftForm onAdd={addDraft} />

          {drafts.length === 0 ? (
            <div className="card text-center text-gray-600 text-sm py-8">
              대기 중인 초안 없음
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {drafts.map(d => (
                <DraftCard
                  key={d.id}
                  draft={d}
                  onApprove={approveDraft}
                  onDelete={deleteDraft}
                  onEdit={updateDraft}
                />
              ))}
            </div>
          )}
        </section>

        {/* 승인된 코멘터리 */}
        {approved.length > 0 && (
          <section className="mb-10">
            <h2 className="text-base font-semibold text-white mb-3">승인된 코멘터리</h2>
            <div className="flex flex-col gap-2">
              {approved.slice(0, 5).map(item => (
                <ApprovedCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* mNAV 히스토리 기록 */}
        <MnavRecorder />

        {/* 기존 코멘터리 (bmnrData.js 기준) */}
        <section>
          <h2 className="text-base font-semibold text-white mb-3">
            현재 공개 코멘터리
            <span className="text-xs text-gray-600 font-normal ml-2">bmnrData.js 기준</span>
          </h2>
          <div className="flex flex-col gap-2">
            {COMMENTARY.map(item => (
              <div key={item.id} className="card">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-600">{item.date}</span>
                  <span className="text-xs text-gray-700">{item.week}</span>
                </div>
                <p className="text-sm text-white">{item.title}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-3">
            위 코멘터리 수정은 src/data/bmnrData.js 직접 편집 후 git push 필요.
          </p>
        </section>
      </main>
    </div>
  )
}
