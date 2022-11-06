import { NextFunction, Request, Response } from 'express'
import { CreateRoomDto } from '../dtos/rooms.dto'
import RoomService from '../services/rooms.service'

class RoomsController {
  public roomService = new RoomService()

  public getRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const propertyId: string = req.params.propertyId
      const isCount: boolean = req.query.count && req.query.count === 'true' ? true : false

      if (isCount) {
        const totalCount = await this.roomService.countRooms(propertyId)
        res.status(200).json(totalCount)
      } else {
        const roomsData = await this.roomService.findRooms(propertyId)
        res.status(200).json(roomsData)
      }
    } catch (error) {
      next(error)
    }
  }

  public getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId: string = req.params.id
      const findOneRoomData = await this.roomService.findRoomById(roomId)

      res.status(200).json(findOneRoomData)
    } catch (error) {
      next(error)
    }
  }

  public createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const propertyId = req.params.propertyId
      const roomData: CreateRoomDto = req.body
      const createRoomData = await this.roomService.createRoom(propertyId, roomData)

      return res.status(201).json(createRoomData)
    } catch (error) {
      next(error)
    }
  }

  public updateRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.id
      const roomData = req.body
      const updateRoomData = await this.roomService.updateRoom(roomId, roomData)

      res.status(200).json(updateRoomData)
    } catch (error) {
      next(error)
    }
  }

  public deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const propertyId = req.params.propertyId
      const roomId = req.params.id
      await this.roomService.deleteRoom(propertyId, roomId)

      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export default RoomsController
