import { useEffect, useState } from 'react'
import api from '../utils/api'

const useFetch = (url) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const fetchData = async (url) => {
    setLoading(true)
    try {
      const res = await api.get(url)
      setData(res.data)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData(url)
  }, [url])

  const reFetch = () => fetchData(url)

  return { data, loading, error, reFetch }
}

export default useFetch
