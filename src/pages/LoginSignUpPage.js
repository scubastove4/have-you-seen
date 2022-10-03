import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'

const LoginSignUpPage = ({
  login,
  setLogin,
  googleLogin,
  authenticated,
  submitRegSignUp,
  signUpValues,
  updateSignUpValues,
  submitRegLogin,
  loginValues,
  updateLoginValues
}) => {
  return (
    <main>
      <div>
        {login ? (
          <LoginForm
            submitRegLogin={submitRegLogin}
            loginValues={loginValues}
            updateLoginValues={updateLoginValues}
          />
        ) : (
          <SignUpForm
            submitRegSignUp={submitRegSignUp}
            signUpValues={signUpValues}
            updateSignUpValues={updateSignUpValues}
          />
        )}
      </div>
      <button onClick={googleLogin}>Google Login</button>
      <button onClick={() => (login ? setLogin(false) : setLogin(true))}>
        Sign Up
      </button>
    </main>
  )
}

export default LoginSignUpPage
