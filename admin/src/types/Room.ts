export interface RoomNumber {
  _id: string
  number: number
  unavailableDates: Date[]
}

export interface Room {
  _id: string
  name: string
  desc: string
  maxPeople: number
  price: number
  roomNumbers: RoomNumber[]
  createdAt: Date
  updatedAt: Date
  __v: number
}

export default Room
