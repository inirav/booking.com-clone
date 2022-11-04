import UserRoles from '../constants/userRoles'

export interface User {
  _id: string
  username: string
  email: string
  password: string
  role: UserRoles
  avatar: string
  toObject: () => User
}
