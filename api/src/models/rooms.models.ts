import { model, Schema, Document } from 'mongoose'
import { Room } from '../interfaces/rooms.interface'

const roomSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    roomNumbers: {
      type: [
        {
          number: Number,
          unavailableDates: [Date],
        },
      ],
      set: (v: string[]) => v.map((number) => ({ number, unavailableDates: [] })),
    },
  },
  { timestamps: true }
)

const roomModel = model<Room & Document>('Room', roomSchema)

export default roomModel
