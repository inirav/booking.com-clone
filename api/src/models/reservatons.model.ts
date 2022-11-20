import { model, Schema, Document } from 'mongoose'
import { Reservation } from '../interfaces/reservations.interface'

const reservationSchema: Schema = new Schema(
  {
    user: {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
    property: {
      ref: 'Property',
      type: Schema.Types.ObjectId,
    },
    rooms: [
      {
        room: {
          ref: 'Room',
          type: Schema.Types.ObjectId,
        },
        roomNumbers: [{ number: Number, unavailableDates: [Date] }],
      },
    ],
    totalAmount: {
      type: Number,
      require: true,
    },
  },

  { timestamps: true }
)

const reservationModel = model<Reservation & Document>('Reservation', reservationSchema)

export default reservationModel
