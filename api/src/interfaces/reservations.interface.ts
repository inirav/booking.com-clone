import { Types } from 'mongoose'
import { Property } from './properties.interface'
import { Room } from './rooms.interface'
import { User } from './users.interface'

export interface Reservation {
  _id: string
  user: Types.ObjectId | User
  property: Types.ObjectId | Property
  rooms:
    | { room: Types.ObjectId; roomNumbers: { number: number; unavailableDates: Date[] }[] }[]
    | { room: Room; roomNumbers: { number: number; unavailableDates: Date[] }[] }[]
  totalAmount: number
}
