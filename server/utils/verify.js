import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken

  if (!token) return next(createError(401, 'Not authenticated.'))

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createError(401, 'Token is not valid.'))
    req.user = user
    next()
  })
}

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) next(err)
    if (req.user.id !== req.params.id || !req.user.isAdmin)
      return next(createError(403, 'Not autherized'))
    next()
  })
}

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) next(err)
    if (!req.user?.isAdmin) return next(createError(403, 'Not autherized'))
    next()
  })
}
