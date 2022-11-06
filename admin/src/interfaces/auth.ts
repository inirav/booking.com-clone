import { User } from './users'

export interface TokenData {
  token: string
  expiresIn: number
}

export interface Login {
  tokenData: TokenData
  user: User
}
