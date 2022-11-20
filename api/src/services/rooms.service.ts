import { CreateRoomDto } from '../dtos/rooms.dto'
import { HttpException } from '../exceptions/HttpException'
import { Property } from '../interfaces/properties.interface'
import { Room, RoomAvailabilityData } from '../interfaces/rooms.interface'
import propertyModel from '../models/properties.model'
import roomModel from '../models/rooms.models'
import { isEmpty } from '../utils/util'

class RoomService {
  public async findRooms(propertyId: string): Promise<Room[]> {
    const findPropertyById = await propertyModel.findById(propertyId).populate('rooms')
    if (!findPropertyById) throw new HttpException(400, "Property doesn't exist")

    return findPropertyById.rooms as Room[]
  }

  public async findRoomById(roomId: string): Promise<Room> {
    if (isEmpty(roomId)) throw new HttpException(400, 'RoomId is empty')

    const findRoom: Room | null = await roomModel.findOne({ _id: roomId })
    if (!findRoom) throw new HttpException(409, "Room doesn't exist")

    return findRoom
  }

  public async createRoom(propertyId: string, roomData: CreateRoomDto): Promise<Room> {
    if (isEmpty(roomData)) throw new HttpException(400, 'roomData is empty')

    const findPropertyById: Property | null = await propertyModel.findById(propertyId)
    if (!findPropertyById) throw new HttpException(400, "Property doesn't exist")

    const createRoomData: Room = await roomModel.create(roomData)
    await propertyModel.findByIdAndUpdate(propertyId, { $push: { rooms: createRoomData._id } })

    return createRoomData
  }

  public async updateRoom(roomId: string, roomData: CreateRoomDto): Promise<Room> {
    if (isEmpty(roomData)) throw new HttpException(400, 'roomData is empty')

    const updateRoomById: Room | null = await roomModel.findByIdAndUpdate(roomId, roomData, {
      new: true,
    })
    if (!updateRoomById) throw new HttpException(400, "Room doesn't exist")

    return updateRoomById
  }

  public async deleteRoom(propertyId: string, roomId: string): Promise<Room> {
    const findPropertyById: Property | null = await propertyModel.findById(propertyId)
    if (!findPropertyById) throw new HttpException(400, "Property doesn't exist")

    const deleteRoomById: Room | null = await roomModel.findByIdAndDelete(roomId)
    if (!deleteRoomById) throw new HttpException(400, "Room doesn't exit")
    await propertyModel.findByIdAndUpdate(propertyId, { $pull: { rooms: roomId } })

    return deleteRoomById
  }

  public async countRooms(propertyId: string): Promise<number> {
    const findPropertyById = await propertyModel.findById(propertyId)
    if (!findPropertyById) throw new HttpException(400, "Property doesn't exist")

    return findPropertyById.rooms.length
  }

  public async updateRoomAvailability(roomData: RoomAvailabilityData, isDeleting: boolean = false) {
    await Promise.all(
      roomData.roomNumbers.map((roomNumber) =>
        roomModel.updateOne(
          { _id: roomData.id, 'roomNumbers.number': roomNumber.number },
          {
            [isDeleting ? '$pullAll' : '$push']: {
              'roomNumbers.$.unavailableDates': roomNumber.unavailableDates,
            },
          }
        )
      )
    )
  }
}

export default RoomService
