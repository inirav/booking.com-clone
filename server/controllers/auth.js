import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
  const user = new User(req.body)
  const salt = bcrypt.genSaltSync(10)
  const hashPass = bcrypt.hashSync(req.body.password, salt)
  user.password = hashPass

  try {
    const savedUser = await user.save()
    delete savedUser._doc.password
    res.json(savedUser)
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }).select('+password')
    if (!user) return next(createError(400, 'Invalid username or password.'))
    const isCorrectPass = await bcrypt.compare(req.body.password, user.password)
    if (!isCorrectPass) return next(createError(400, 'Invalid username or password.'))

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

    delete user._doc.password
    res.json({ accessToken: token, user })
  } catch (error) {
    next(error)
  }
}
