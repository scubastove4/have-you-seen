const Home = ({ googleLogin, googleLogout, authenticated }) => {
  return (
    <div>{authenticated && <button onClick={googleLogout}>Logout</button>}</div>
  )
}

export default Home
