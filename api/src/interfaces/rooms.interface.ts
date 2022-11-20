import { Types } from 'mongoose'

export interface Room {
  _id: string
  name: string
  desc: string
  price: number
  roomNumbers: { number: number; unavailableDates: Date[] }[]
}

export interface RoomAvailabilityData {
  id: string
  roomNumbers: {
    number: number
    unavailableDates: Date[]
  }[]
}
