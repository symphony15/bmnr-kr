import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDLuhZd03CI-5tKt83jljHRGVQYaSOWhtM",
  authDomain: "bmnr-kr.firebaseapp.com",
  projectId: "bmnr-kr",
  storageBucket: "bmnr-kr.firebasestorage.app",
  messagingSenderId: "1010244544605",
  appId: "1:1010244544605:web:7c1bb3b67740bd285b05b4"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
