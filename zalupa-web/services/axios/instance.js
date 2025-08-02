import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL_API,
  api_key: import.meta.env.VITE_BACKEND_YOUTUBE_API_KEY
})
