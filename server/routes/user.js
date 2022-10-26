import { Router } from 'express'
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/user.js'
import { isAdmin, isPermitted } from '../middlewares/auth.js'

const router = Router()

router.put('/:id', isPermitted, updateUser)
router.delete('/:id', isPermitted, deleteUser)
router.get('/:id', isPermitted, getUser)
router.get('/', isAdmin, getUsers)

export default router
