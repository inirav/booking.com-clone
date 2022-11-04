export interface Room {
  _id: string
  name: string
  desc: string
  price: number
  roomNumbers: { number: number; unavailableDates: Date[] }[]
}
