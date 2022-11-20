import { Router } from 'express'
import UserRoles from '../constants/userRoles'
import ReservationsController from '../controllers/reservations.controller'
import { CreateReservationDto } from '../dtos/reservations.dto'
import authMiddleware from '../middlewares/auth.middleware'
import validationMiddleware from '../middlewares/validation.middleware'

class ReservationRoutes {
  private path = '/reservations'
  public router = Router()
  private reservationsController = new ReservationsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware([UserRoles.USER, UserRoles.ADMIN]),
      this.reservationsController.getReservations
    )
    this.router.post(
      `${this.path}`,
      authMiddleware([UserRoles.USER, UserRoles.ADMIN]),
      validationMiddleware(CreateReservationDto, 'body'),
      this.reservationsController.createReservation
    )
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware([UserRoles.USER, UserRoles.ADMIN]),
      this.reservationsController.deleteReservation
    )
  }
}

export default ReservationRoutes
