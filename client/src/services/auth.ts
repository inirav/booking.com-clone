import { Login } from '../interfaces/auth'
import { User } from '../interfaces/users'
import api from '../utils/api'

export const login = async (payload: { username: string; password: string }): Promise<Login> => {
  const res = await api.post('/login', payload)
  return res.data
}

export const signup = async (payload: any): Promise<User> => {
  const res = await api.post('/signup', payload)
  return res.data
}
