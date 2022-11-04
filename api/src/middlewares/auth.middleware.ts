import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import UserRoles from '../constants/userRoles'
import { HttpException } from '../exceptions/HttpException'
import { DataStoredInToken, RequestWithUser } from '../interfaces/auth.interface'
import userModel from '../models/users.model'

const authMiddleware = (allowedRoles: UserRoles[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Authorization = req.header('Authorization')?.split('Bearer ')[1]

      if (Authorization) {
        const secretKey: string = JWT_SECRET as string
        const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken
        const userId = verificationResponse._id
        const findUser = await userModel.findById(userId)

        if (findUser) {
          if (allowedRoles.includes(findUser.role)) {
            ;(req as RequestWithUser).user = findUser
            next()
          } else {
            next(new HttpException(403, 'Not authorized'))
          }
        } else {
          next(new HttpException(401, 'Wrong authentication token'))
        }
      } else {
        next(new HttpException(400, 'Authentication token missing'))
      }
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'))
    }
  }
}

export default authMiddleware
