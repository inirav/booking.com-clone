import { Router } from 'express'
import authRoute from './auth.js'
import hotelRoute from './hotel.js'
import userRoute from './user.js'
import roomRoute from './room.js'
import objectRoute from './object.js'

const router = Router()

router.use('/auth', authRoute)
router.use('/hotels', hotelRoute)
router.use('/users', userRoute)
router.use('/rooms', roomRoute)
router.use('/objects', objectRoute)

export default router
