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
import { isAdmin } from '../middlewares/auth.js'

const router = Router()

router.post('/', isAdmin, createHotel)
router.put('/:id', isAdmin, updateHotel)
router.delete('/:id', isAdmin, deleteHotel)

router.get('/:id', getHotel)
router.get('/', getHotels)
router.get('/countByCities', countByCities)
router.get('/countByPropertyTypes', countByPropertyTypes)
router.get('/room/:id', getHotelRooms)

export default router
