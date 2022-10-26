import Room from './Room'

export interface Hotel {
  _id: string
  name: string
  type: string
  city: string
  address: string
  description: string
  cheapestPrice: number
  rating: number
  photos: string[]
  rooms: Room[]
  featured: boolean
  reviews: number
  distance: number
  freeAirportTaxi: boolean
  freeCancellation: boolean
  highlights: string
}
export default Hotel
