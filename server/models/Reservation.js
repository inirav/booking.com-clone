import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema({
  user: { type: String, required: true },
  hotel: { type: String, required: true },
  rooms: { type: String, required: true },
})

export default mongoose.model('Reservation', reservationSchema)
