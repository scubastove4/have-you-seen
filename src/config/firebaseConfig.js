// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
const AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
const PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID
const STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
const MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
const APP_ID = process.env.REACT_APP_FIREBASE_APP_ID
const MEASUREMENT_ID = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export default app
