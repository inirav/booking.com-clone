import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorLogger, errorResponder } from './middlewares/error.js'
import router from './routes/index.js'
import { v2 as cloudinary } from 'cloudinary'
import { createError } from './utils/error.js'

const app = express()

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// middlewares
app.use(cors('*'))
app.use(express.json())
app.use(cookieParser())

app.use('/', router)
app.get('*', (req, res, next) => {
  next(createError(404, 'Endpoint not found'))
})

app.use(errorLogger)
app.use(errorResponder)

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
  } catch (error) {
    throw error
  }
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  connect()
  console.log(`Listening on port ${port}`)
})
