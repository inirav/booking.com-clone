import { Login } from '../interfaces/auth'
import api from '../utils/api'

export const login = async (payload: any): Promise<Login> => {
  const res = await api.post('/login', payload)
  return res.data
}
