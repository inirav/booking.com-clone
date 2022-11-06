import { NextFunction, Request, Response } from 'express'
import { CreateUserDto } from '../dtos/users.dto'
import { User } from '../interfaces/users.interface'
import UserService from '../services/users.service'

class UsersController {
  private userService = new UserService()

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCount: boolean = req.query.count && req.query.count === 'true' ? true : false

      if (isCount) {
        const totalCount = await this.userService.countUsers()
        res.status(200).json(totalCount)
      } else {
        const findAllUsersData: User[] = await this.userService.findUsers()
        res.status(200).json(findAllUsersData)
      }
    } catch (error) {
      next(error)
    }
  }

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id
      const findOneUserData: User = await this.userService.findUserById(userId)

      res.status(200).json(findOneUserData)
    } catch (error) {
      next(error)
    }
  }

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body
      const createUserData: User = await this.userService.createUser(userData)
      const { password, ...user } = createUserData.toObject()

      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  }

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id
      const userData: CreateUserDto = req.body
      const updateUserData: User = await this.userService.updateUser(userId, userData)
      const { password, ...user } = updateUserData.toObject()

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id
      await this.userService.deleteUser(userId)

      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export default UsersController
