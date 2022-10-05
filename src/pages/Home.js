import { useState } from 'react'
import axios from 'axios'

import { getResultByTitle } from '../rapidApiServices'

const Home = ({ googleLogin, googleLogout, authenticated }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  const updateSearchQuery = (e) => {
    setSearchQuery(e.target.value)
  }

  const submitSearchQuery = async (e) => {
    e.preventDefault()
    const res = await getResultByTitle(searchQuery)
    setSearchResults(res)
  }

  return (
    <div>
      <form onSubmit={submitSearchQuery}>
        <input
          placeholder="Search Show or Movie"
          value={searchQuery}
          onInput={updateSearchQuery}
        />
        <button type="submit">Submit</button>
      </form>
      {authenticated && <button onClick={googleLogout}>Logout</button>}
      <main>
        {searchResults?.map((result) => (
          <div>
            <h2 key={result.id}>{result.name}</h2>
          </div>
        ))}
      </main>
    </div>
  )
}

export default Home
