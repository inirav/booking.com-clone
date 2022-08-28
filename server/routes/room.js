import { Router } from 'express'
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from '../controllers/room.js'
import { verifyAdmin } from '../utils/verify.js'

const router = Router()

router.post('/', verifyAdmin, createRoom)
router.put('/:id', verifyAdmin, updateRoom)
router.put('/availability/:id', updateRoomAvailability)
router.delete('/:id', verifyAdmin, deleteRoom)
router.get('/:id', getRoom)
router.get('/', getRooms)

export default router
