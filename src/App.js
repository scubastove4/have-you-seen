import { Route, Routes } from 'react-router-dom'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

import Home from './pages/Home'

import './App.css'

function App() {
  // initialize instance of Google Provider
  const provider = new GoogleAuthProvider()
  // placeholder for email
  provider.setCustomParameters({
    login_hint: 'user@example.com'
  })

  // sign in using popup
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
    })
    .catch((e) => {
      const errorCode = e.errorCode
      const errorMessage = e.message
      const email = e.customData.email
      const credential = GoogleAuthProvider.credentialFromError(e)
    })

  const googleLogin = () => {}

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home googleLogin={googleLogin} />} />
      </Routes>
    </div>
  )
}

export default App
