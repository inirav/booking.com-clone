import { Router } from 'express'
import UserRoles from '../constants/userRoles'
import RoomsController from '../controllers/rooms.controller'
import { CreateRoomDto } from '../dtos/rooms.dto'
import authMiddleware from '../middlewares/auth.middleware'
import validationMiddleware from '../middlewares/validation.middleware'

class RoomsRoute {
  private path = '/properties/:propertyId/rooms'
  public router = Router()
  private roomsController = new RoomsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.roomsController.getRooms)
    this.router.get(`${this.path}/:id`, this.roomsController.getRoomById)
    this.router.post(
      `${this.path}`,
      authMiddleware([UserRoles.ADMIN]),
      validationMiddleware(CreateRoomDto, 'body'),
      this.roomsController.createRoom
    )
    this.router.put(
      `${this.path}/:id`,
      authMiddleware([UserRoles.ADMIN]),
      validationMiddleware(CreateRoomDto, 'body', true),
      this.roomsController.updateRoom
    )
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware([UserRoles.ADMIN]),
      this.roomsController.deleteRoom
    )
  }
}

export default RoomsRoute
