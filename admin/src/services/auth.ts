import User from '../types/User'
import api from '../utils/api'

export const login = async (payload: any): Promise<{ accessToken: string; user: User }> => {
  try {
    const res = await api.post('/auth/login', payload)
    return res.data
  } catch (error) {
    throw new Error('Authentication Failed')
  }
}
