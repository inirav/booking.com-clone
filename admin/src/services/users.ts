import { User } from '../interfaces/users'
import api from '../utils/api'

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get('/users')
  return res.data
}

export const getUserCount = async (): Promise<number> => {
  const res = await api.get('/users', { params: { count: true } })
  return res.data
}
