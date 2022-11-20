import { Types } from 'mongoose'
import PropertyTypes from '../constants/propertyTypes'
import { Room } from './rooms.interface'

export interface Property {
  _id: string
  name: string
  type: PropertyTypes
  city: string
  address: string
  desc: string
  cheapestPrice: number
  images: Types.Array<string>
  distance: number
  freeAirportTaxi: boolean
  freeCancellation: boolean
  featured: boolean
  highlights: string
  rooms: Types.ObjectId[] | Room[]
}
