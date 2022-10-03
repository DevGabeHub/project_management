import { initializeApp } from 'firebase/app'
import { getFirestore, Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBA_bPYO_K759_cOvDrRCV12MQnpC40wvw',
  authDomain: 'the-dojo-db-1293e.firebaseapp.com',
  projectId: 'the-dojo-db-1293e',
  storageBucket: 'the-dojo-db-1293e.appspot.com',
  messagingSenderId: '1092484544199',
  appId: '1:1092484544199:web:5ce7c26ca88876df05f0e2',
}

//init firebase
initializeApp(firebaseConfig)

//init services
const db = getFirestore()
const auth = getAuth()
const storage = getStorage()

const timestamp = Timestamp

export { db, auth, storage, timestamp }
