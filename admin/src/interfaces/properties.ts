import Room from './rooms'

export interface Property {
  _id: string
  name: string
  type: string
  city: string
  address: string
  desc: string
  cheapestPrice: number
  rating: number
  images: string[]
  rooms: Room[]
  reviews: number
  distance: number
  freeAirportTaxi: boolean
  freeCancellation: boolean
  highlights: string
}
export default Property
