// 현재 SNAPSHOT 값을 Firestore mnav_history 컬렉션에 수동 시드
// 실행: node scripts/seedMnav.js

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { SNAPSHOT } from '../src/data/bmnrData.js'

const firebaseConfig = {
  apiKey: 'AIzaSyDLuhZd03CI-5tKt83jljHRGVQYaSOWhtM',
  authDomain: 'bmnr-kr.firebaseapp.com',
  projectId: 'bmnr-kr',
  storageBucket: 'bmnr-kr.firebasestorage.app',
  messagingSenderId: '1010244544605',
  appId: '1:1010244544605:web:7c1bb3b67740bd285b05b4',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function seed() {
  const { dataDate, mNAV, ethPriceUSD, stockPriceUSD, ethHoldings, mnavNote } = SNAPSHOT

  const payload = {
    date: dataDate,
    mNAV,
    ethPrice: ethPriceUSD,
    bmnrStock: stockPriceUSD,
    ethHoldings,
    memo: mnavNote ?? '',
  }

  // date를 document ID로 사용 → 같은 날짜 중복 방지
  const ref = doc(db, 'mnav_history', dataDate)
  await setDoc(ref, payload, { merge: true })

  console.log(`✅ mnav_history/${dataDate} 기록 완료`)
  console.table(payload)
  process.exit(0)
}

seed().catch(e => {
  console.error('❌ 오류:', e.message)
  process.exit(1)
})
