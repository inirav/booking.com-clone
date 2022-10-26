import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    isAdmin: { type: Boolean, default: false },
    avatar: { type: String, default: 'https://randomuser.me/api/portraits/lego/1.jpg' },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
