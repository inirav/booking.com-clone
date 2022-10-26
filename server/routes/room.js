import { Router } from 'express'
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from '../controllers/room.js'
import { isAdmin, verifyToken } from '../middlewares/auth.js'

const router = Router()

router.post('/', isAdmin, createRoom)
router.put('/:id', isAdmin, updateRoom)
router.delete('/:id', isAdmin, deleteRoom)

router.put('/availability/:id', verifyToken, updateRoomAvailability)

router.get('/:id', getRoom)
router.get('/', getRooms)

export default router
