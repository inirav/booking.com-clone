import { Router } from 'express'
import UsersController from '../controllers/users.controller'
import { CreateUserDto } from '../dtos/users.dto'
import { Routes } from '../interfaces/routes.interface'
import { isAdmin } from '../middlewares/auth.middleware'
import validationMiddleware from '../middlewares/validation.middleware'

class UsersRoute implements Routes {
  public path = '/users'
  public router = Router()
  public usersController = new UsersController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, isAdmin, this.usersController.getUsers)
    this.router.get(`${this.path}/:id`, this.usersController.getUserById)
    this.router.post(
      `${this.path}`,
      isAdmin,
      validationMiddleware(CreateUserDto, 'body'),
      this.usersController.createUser
    )
    this.router.put(
      `${this.path}/:id`,
      isAdmin,
      validationMiddleware(CreateUserDto, 'body', true),
      this.usersController.updateUser
    )
    this.router.delete(`${this.path}/:id`, isAdmin, this.usersController.deleteUser)
  }
}

export default UsersRoute
