import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return next(createError(401, 'Not authorized'))

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(401, 'Token is not valid'))
    req.user = user
    next()
  })
}

const verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return next(createError('Unauthorized'))
  next()
}

const verifyPerms = (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.id) return next(createError('Unauthorized'))
  next()
}

export const isAdmin = [verifyToken, verifyAdmin]
export const isPermitted = [verifyToken, verifyPerms]
