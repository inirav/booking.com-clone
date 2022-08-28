import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, require: true },
    maxPeople: { type: Number, required: true },
    price: { type: Number, required: true },
    roomNumbers: [{ number: Number, unavailableDates: [Date] }],
  },
  { timestamps: true }
)

export default mongoose.model('Room', roomSchema)
