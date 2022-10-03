import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm'

const LoginSignUpPage = ({ login }) => {
  return <main>{login ? <LoginForm /> : <SignUpForm />}</main>
}

export default LoginSignUpPage
