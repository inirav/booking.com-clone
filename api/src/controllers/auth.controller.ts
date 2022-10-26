import { NextFunction, Request, Response } from 'express'
import { CreateUserDto } from '../dtos/users.dto'
import { RequestWithUser } from '../interfaces/auth.interface'
import { User } from '../interfaces/users.interface'
import AuthService from '../services/auth.service'

class AuthController {
  public authService = new AuthService()

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body
      const signUpUserData: User = await this.authService.signup(userData)
      const { password, ...user } = signUpUserData.toObject()

      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body
      const { tokenData, findUser } = await this.authService.login(userData)

      res.status(200).json({ tokenData, user: findUser })
    } catch (error) {
      next(error)
    }
  }

  public logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = (req as RequestWithUser).user
      const logOutUserData: User = await this.authService.logout(userData)
      res.status(200).json(logOutUserData)
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController
