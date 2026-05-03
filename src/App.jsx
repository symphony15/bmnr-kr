import Dashboard from './components/Dashboard'
import AccumulationChart from './components/AccumulationChart'
import Commentary from './components/Commentary'

function Header() {
  return (
    <header className="border-b border-border bg-surface-2/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-eth-blue/20 flex items-center justify-center">
            <span className="text-eth-blue text-sm font-bold">B</span>
          </div>
          <div>
            <span className="font-bold text-white text-sm">BMNR-KR</span>
            <span className="text-gray-600 text-xs ml-2">이더리움 DAT 분석 허브</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <a
            href="https://finance.yahoo.com/quote/BMNR/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            BMNR 주가 ↗
          </a>
          <a
            href="https://beaconcha.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            beaconcha.in ↗
          </a>
          <span className="px-2 py-0.5 bg-surface-3 rounded text-gray-600">Beta</span>
        </div>
      </div>
    </header>
  )
}

function HeroStrip() {
  return (
    <div className="bg-gradient-to-r from-eth-blue/10 via-eth-purple/10 to-surface border-b border-border">
      <div className="max-w-5xl mx-auto px-4 py-5">
        <h1 className="text-xl font-bold text-white">
          BitMine Immersion Technologies
          <span className="text-gray-500 font-normal text-base ml-2">$BMNR</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          나스닥 상장 이더리움 DAT 기업 — 한국어 분석 허브 by{' '}
          <a href="https://youtube.com/@비욘드로스" target="_blank" rel="noopener noreferrer" className="text-eth-blue hover:underline">
            비욘드로스
          </a>
        </p>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border mt-12 bg-surface-2/50">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center">
        <p className="text-xs text-gray-600">
          BMNR-KR은 투자 권유 사이트가 아닙니다. 개인 분석 목적으로만 운영됩니다.
        </p>
        <p className="text-xs text-gray-700 mt-1">
          데이터 출처: SEC 공시, beaconcha.in, Yahoo Finance · 비욘드로스 운영
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <HeroStrip />

      <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-10">
        <Dashboard />
        <AccumulationChart />
        <Commentary />
      </main>

      <Footer />
    </div>
  )
}
