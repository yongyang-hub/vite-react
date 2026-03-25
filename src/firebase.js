import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, set, onValue } from 'firebase/database'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL:       import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db  = getDatabase(app)

export const dbGet = async (path) => {
  const snap = await get(ref(db, path))
  return snap.exists() ? snap.val() : null
}

export const dbSet = async (path, value) => {
  await set(ref(db, path), value)
}

export const dbListen = (path, callback) => {
  const unsubscribe = onValue(ref(db, path), snap => {
    callback(snap.exists() ? snap.val() : null)
  })
  return unsubscribe
}
