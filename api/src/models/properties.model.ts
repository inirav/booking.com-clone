import { model, Schema } from 'mongoose'
import { Property } from '../interfaces/properties.interface'

const propertySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    cheapestPrice: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    freeAirportTaxi: {
      type: Boolean,
      default: false,
    },
    freeCancellation: {
      type: Boolean,
      default: false,
    },
    highlights: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rooms: [
      {
        ref: 'Room',
        type: Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
)

const propertyModel = model<Property & Document>('Property', propertySchema)

export default propertyModel
