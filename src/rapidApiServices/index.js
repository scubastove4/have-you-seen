import { async } from '@firebase/util'
import axios from 'axios'

const RAPID_API_KEY = process.env.REACT_APP_RAPID_API_KEY
const RAPID_API_HOST = process.env.REACT_APP_RAPID_API_HOST

export const getResultByTitle = async (searchQuery) => {
  const options = {
    method: 'GET',
    url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup',
    params: { term: searchQuery, country: 'us' },
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST
    }
  }
  try {
    const res = await axios.request(options)
    return res.data.results
  } catch (e) {
    console.error(e)
  }
}

export const getResultById = async (sourceId, source) => {
  const options = {
    method: 'GET',
    url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup',
    params: { source_id: sourceId, source: source, country: 'us' },
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST
    }
  }
  try {
    const res = await axios.request(options)
    return res.data.results
  } catch (e) {
    console.error(e)
  }
}
