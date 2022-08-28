import { Router } from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js'
import { verifyAdmin, verifyUser } from '../utils/verify.js'

const router = Router()

router.put('/:id', verifyUser, updateUser)
router.delete('/:id', verifyUser, deleteUser)
router.get('/:id', verifyUser, getUser)
router.get('/', verifyAdmin, getUsers)

export default router
