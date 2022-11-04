import { Router } from 'express'
import UserRoles from '../constants/userRoles'
import UsersController from '../controllers/users.controller'
import { CreateUserDto } from '../dtos/users.dto'
import authMiddleware from '../middlewares/auth.middleware'
import validationMiddleware from '../middlewares/validation.middleware'

class UsersRoute {
  private path = '/users'
  public router = Router()
  private usersController = new UsersController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware([UserRoles.ADMIN]),
      this.usersController.getUsers
    )
    this.router.get(`${this.path}/:id`, this.usersController.getUserById)
    this.router.post(
      `${this.path}`,
      authMiddleware([UserRoles.ADMIN]),
      validationMiddleware(CreateUserDto, 'body'),
      this.usersController.createUser
    )
    this.router.put(
      `${this.path}/:id`,
      authMiddleware([UserRoles.ADMIN]),
      validationMiddleware(CreateUserDto, 'body', true),
      this.usersController.updateUser
    )
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware([UserRoles.ADMIN]),
      this.usersController.deleteUser
    )
  }
}

export default UsersRoute
