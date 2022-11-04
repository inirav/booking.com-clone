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
      const { password, ...user } = findUser.toObject()

      res.status(200).json({ tokenData, user })
    } catch (error) {
      next(error)
    }
  }

  public logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: User = (req as RequestWithUser).user
      await this.authService.logout(userData)
      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController
