export interface RoomNumber {
  _id: string
  number: number
  unavailableDates: Date[]
}

export interface Room {
  _id: string
  name: string
  desc: string
  price: number
  roomNumbers: RoomNumber[]
}

export default Room
