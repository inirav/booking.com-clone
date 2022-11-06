import { config } from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'

config()

export const {
  NODE_ENV,
  PORT,
  ORIGIN,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  JWT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})
