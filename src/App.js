import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import Home from './pages/Home'

import './App.css'
import userEvent from '@testing-library/user-event'

function App() {
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)
  // const [token, setToken] = useState(null)

  const auth = getAuth()

  // initialize instance of Google Provider
  const provider = new GoogleAuthProvider()
  // placeholder for email
  provider.setCustomParameters({
    login_hint: 'user@example.com'
  })

  const googleLogin = () => {
    // sign in using popup
    // const auth = getAuth()
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      console.log(credential)
      setAuthenticated(true)
      result.user.getIdToken().then((token) => {
        // setToken(token)
        window.localStorage.setItem('token', token)
      })
      // const token = credential.accessToken
      setUser({
        displayName: result.user.displayName,
        email: result.user.email,
        userId: result.user.uid
      })
    })
    // .catch((e) => {
    //   const errorCode = e.errorCode
    //   const errorMessage = e.message
    //   const email = e.customData.email
    //   const credential = GoogleAuthProvider.credentialFromError(e)
    // })
  }

  const googleLogout = () => {
    // const auth = getAuth()
    signOut(auth)
      .then(() => {
        console.log('signed out')
        setUser(null)
        // setToken(null)
        setAuthenticated(false)
        window.localStorage.clear()
      })
      .catch((e) => {
        console.log('error')
      })
  }

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setAuthenticated(true)
  //       user.getIdToken().then((token) => {
  //         // setToken(token)
  //         window.localStorage.setItem('token', token)
  //       })
  //       // console.log(user)
  //     } else {
  //       console.log('no user')
  //     }
  //   })
  // }, [])

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              googleLogin={googleLogin}
              googleLogout={googleLogout}
              authenticated={authenticated}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
