import { CreateReservationDto } from '../dtos/reservations.dto'
import { HttpException } from '../exceptions/HttpException'
import { Reservation } from '../interfaces/reservations.interface'
import reservationModel from '../models/reservatons.model'
import { isEmpty } from '../utils/util'
import RoomService from './rooms.service'

class ReservationService {
  private roomService = new RoomService()

  public async findReservations(filters: any = {}): Promise<Reservation[]> {
    const findReservations: Reservation[] = await reservationModel
      .find(filters)
      .populate('user', 'username')
      .populate('property', 'name images')
      .populate('rooms.room', 'name')

    return findReservations
  }

  public async createReservation(reservationData: CreateReservationDto): Promise<Reservation> {
    if (isEmpty(reservationData)) throw new HttpException(400, 'reservationData is empty')

    // Update rooms availability
    await Promise.all(
      reservationData.rooms.map((room) => this.roomService.updateRoomAvailability(room))
    )

    const createReservationData: Reservation = await reservationModel.create({
      ...reservationData,
      rooms: reservationData.rooms.map((room) => ({
        room: room.id,
        roomNumbers: room.roomNumbers,
      })),
    })

    return createReservationData
  }

  public async deleteReservation(reservationId: string): Promise<Reservation> {
    const deleteReservationById: Reservation | null = await reservationModel.findByIdAndDelete(
      reservationId
    )
    if (!deleteReservationById) throw new HttpException(400, "Reservation doesn't exist")

    // Update rooms availability
    await Promise.all(
      deleteReservationById.rooms.map((room) =>
        this.roomService.updateRoomAvailability(
          {
            id: room.room._id as string,
            roomNumbers: room.roomNumbers,
          },
          true
        )
      )
    )

    return deleteReservationById
  }

  public async countReservations(filters: any = {}): Promise<number> {
    const count = await reservationModel.countDocuments(filters)

    return count
  }
}

export default ReservationService
