import { Router } from 'express'
import { deleteObject } from '../controllers/object.js'

const router = Router()

router.delete('/:id', deleteObject)

export default router
