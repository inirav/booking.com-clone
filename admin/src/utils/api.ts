import axios from 'axios'
import queryString from 'query-string'

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:5000',
  paramsSerializer: queryString.stringify,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  config.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  return config
})

export default api
