import Property from './properties'
import Room from './rooms'
import { User } from './users'

export interface Reservation {
  _id: string
  user: User
  property: Property
  rooms: { room: Room; roomNumbers: { number: number; unavailableDates: Date[] }[] }[]
  totalAmount: number
}
