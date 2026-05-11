import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase.js'
import { SNAPSHOT } from '../data/bmnrData.js'

// 임의 값으로 기록
export async function recordMnav({ date, mNAV, ethPrice, bmnrStock, ethHoldings, memo = '' }) {
  const ref = doc(db, 'mnav_history', date)
  await setDoc(ref, { date, mNAV, ethPrice, bmnrStock, ethHoldings, memo }, { merge: true })
}

// bmnrData.js SNAPSHOT 현재값 그대로 기록
export async function recordCurrentSnapshot() {
  const { dataDate, mNAV, ethPriceUSD, stockPriceUSD, ethHoldings, mnavNote } = SNAPSHOT
  await recordMnav({
    date: dataDate,
    mNAV,
    ethPrice: ethPriceUSD,
    bmnrStock: stockPriceUSD,
    ethHoldings,
    memo: mnavNote ?? '',
  })
}
