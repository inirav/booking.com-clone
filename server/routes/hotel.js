import { Router } from 'express'
import {
  countByCities,
  countByPropertyTypes,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from '../controllers/hotel.js'
import { verifyAdmin } from '../utils/verify.js'

const router = Router()

router.post('/', verifyAdmin, createHotel)
router.put('/:id', verifyAdmin, updateHotel)
router.delete('/:id', verifyAdmin, deleteHotel)
router.get('/find/:id', getHotel)
router.get('/', getHotels)
router.get('/countByCities', countByCities)
router.get('/countByPropertyTypes', countByPropertyTypes)
router.get('/room/:id', getHotelRooms)

export default router
