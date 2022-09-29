const Home = ({ googleLogin, googleLogout, authenticated }) => {
  return (
    <div>
      {authenticated ? (
        <button onClick={googleLogout}>Logout</button>
      ) : (
        <button onClick={googleLogin}>Google Login</button>
      )}
    </div>
  )
}

export default Home
