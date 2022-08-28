import mongoose from 'mongoose'

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  cheapestPrice: { type: Number, required: true },
  rating: { type: Number, required: true },
  photos: { type: [String], required: true },
  rooms: [String],
  featured: { type: Boolean, default: false },
  reviews: Number,
  distance: { type: Number, required: true },
  freeAirportTaxi: { type: Boolean, default: false },
  freeCancellation: { type: Boolean, default: false },
  highlights: String,
})

export default mongoose.model('Hotel', hotelSchema)
