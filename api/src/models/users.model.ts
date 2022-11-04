import { model, Schema, Document } from 'mongoose'
import UserRoles from '../constants/userRoles'
import { User } from '../interfaces/users.interface'

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: UserRoles.USER,
    },
    avatar: {
      type: String,
      default: 'https://randomuser.me/api/portraits/lego/1.jpg',
    },
  },
  { timestamps: true }
)

const userModel = model<User & Document>('User', userSchema)

export default userModel
