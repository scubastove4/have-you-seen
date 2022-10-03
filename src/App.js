import { useState } from 'react' //useEffect
import { Route, Routes, useNavigate } from 'react-router-dom'

import {
  // getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  // onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

import { auth } from './config/firebaseConfig'
//
// import { CheckSession } from './services/CheckSession'
import Home from './pages/Home'
import LoginSignUpPage from './pages/LoginSignUpPage'

import './App.css'

function App() {
  // user and authenticated
  const [user, setUser] = useState(null)
  const [authenticated, setAuthenticated] = useState(false)

  // login or sign up state
  const [login, setLogin] = useState(true)

  // login and sign up values
  const [signUpValues, setSignUpValues] = useState({
    // username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loginValues, setLoginValues] = useState({ email: '', password: '' })

  // update login and sign up values
  const updateSignUpValues = (e) => {
    setSignUpValues({ ...signUpValues, [e.target.name]: e.target.value })
  }

  const updateLoginValues = (e) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value })
  }

  //navigate to different pages
  let navigate = useNavigate()

  // initialize firebase auth
  // const auth = getAuth()

  // initialize instance of Google Provider
  const provider = new GoogleAuthProvider()
  // placeholder for email
  provider.setCustomParameters({
    login_hint: 'user@example.com'
  })

  // use google acct to sign up new user or login existing
  const googleLogin = () => {
    // sign in using popup
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      console.log(credential)
      setAuthenticated(true)
      result.user.getIdToken().then((token) => {
        window.localStorage.setItem('token', token)
      })
      setUser({
        displayName: result.user.displayName,
        email: result.user.email,
        userId: result.user.uid
      })
      navigate('/')
    })
    // .catch((e) => {
    //   const errorCode = e.errorCode
    //   const errorMessage = e.message
    //   const email = e.customData.email
    //   const credential = GoogleAuthProvider.credentialFromError(e)
    // })
  }

  // firebase sign up and login, no google acct
  const submitRegSignUp = (e) => {
    e.preventDefault()
    console.log(signUpValues.email, signUpValues.password)
    createUserWithEmailAndPassword(
      auth,
      signUpValues.email,
      signUpValues.password
    )
      .then(() => {
        setLogin(true)
      })
      .catch((error) => {
        console.log(
          error.errorCode,
          error.errorMessage,
          error.customData.email,
          GoogleAuthProvider.credentialFromError(error)
        )
        // const errorCode = e.errorCode
        // const errorMessage = e.message
        // const email = e.customData.email
        // const credential = GoogleAuthProvider.credentialFromError(e)
      })
  }

  const submitRegLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(
      auth,
      loginValues.email,
      loginValues.password
    ).then((userCredential) => {
      setUser({
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        userId: userCredential.user.uid
      })
      userCredential.user.getIdToken().then((token) => {
        window.localStorage.setItem('token', token)
      })
      setAuthenticated(true)
      navigate('/')
    })
    // .catch((e) => {
    //   const errorCode = e.errorCode
    //   const errorMessage = e.message
    //   const email = e.customData.email
    //   const credential = GoogleAuthProvider.credentialFromError(e)
    // })
  }

  // firebase logout
  const googleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('signed out')
        setUser(null)
        setAuthenticated(false)
        window.localStorage.clear()
        navigate('/login')
      })
      .catch((e) => {
        console.log('error')
      })
  }

  // const checkToken = async () => {
  //   const token = localStorage.getItem('token')
  //   if (token) checkToken()
  //   const userCheck = await CheckSession()
  //   setUser(userCheck)
  // }

  // useEffect(() => {
  //   checkToken()
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
              // googleLogin={googleLogin}
              googleLogout={googleLogout}
              authenticated={authenticated}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginSignUpPage
              googleLogin={googleLogin}
              // googleLogout={googleLogout}
              authenticated={authenticated}
              login={login}
              setLogin={setLogin}
              submitRegSignUp={submitRegSignUp}
              signUpValues={signUpValues}
              updateSignUpValues={updateSignUpValues}
              submitRegLogin={submitRegLogin}
              loginValues={loginValues}
              updateLoginValues={updateLoginValues}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
