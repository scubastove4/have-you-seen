const LoginForm = ({ submitRegLogin, loginValues, updateLoginValues }) => {
  return (
    <form onSubmit={(e) => submitRegLogin(e)} id="login-form">
      <span>
        <label htmlFor="login-username">Email</label>
        <input
          type="text"
          id="login-email"
          name="email"
          value={loginValues.email}
          onInput={updateLoginValues}
          required
        />
      </span>
      <span>
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          name="password"
          value={loginValues.password}
          onInput={updateLoginValues}
          required
        />
      </span>
      <button
        type="submit"
        disabled={!loginValues.email || !loginValues.password}
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm
