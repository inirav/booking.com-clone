import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import hotelRoute from './routes/hotel.js'
import userRoute from './routes/user.js'
import roomRoute from './routes/room.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
  } catch (error) {
    throw error
  }
}

// middlewares
app.use(cors('*'))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)
app.use('/api/hotels', hotelRoute)
app.use('/api/users', userRoute)
app.use('/api/rooms', roomRoute)

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'

  return res.status(status).json({
    success: false,
    status,
    message,
    stack: err.stack,
  })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  connect()
  console.log(`Listening on port ${port}`)
})
