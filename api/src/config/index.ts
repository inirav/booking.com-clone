import { config } from 'dotenv'

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
