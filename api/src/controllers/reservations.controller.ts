import { NextFunction, Request, Response } from 'express'
import { CreateReservationDto } from '../dtos/reservations.dto'
import { Reservation } from '../interfaces/reservations.interface'
import ReservationService from '../services/reservations.service'

class ReservationsController {
  private reservationService = new ReservationService()

  public getReservations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { count, ...filters } = req.query
      const isCount: boolean = count && count === 'true' ? true : false

      if (isCount) {
        const totalCount = await this.reservationService.countReservations(filters)

        res.status(200).json(totalCount)
      } else {
        const findAllReservationsData: Reservation[] =
          await this.reservationService.findReservations(filters)

        res.status(200).json(findAllReservationsData)
      }
    } catch (error) {
      next(error)
    }
  }

  public createReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reservationData: CreateReservationDto = req.body
      const createUserData: Reservation = await this.reservationService.createReservation(
        reservationData
      )

      res.status(201).json(createUserData)
    } catch (error) {
      next(error)
    }
  }

  public deleteReservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reservationId: string = req.params.id
      await this.reservationService.deleteReservation(reservationId)

      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export default ReservationsController
