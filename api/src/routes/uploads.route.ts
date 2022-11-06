import { Router } from 'express'
import UserRoles from '../constants/userRoles'
import UploadsController from '../controllers/uploads.controller'
import authMiddleware from '../middlewares/auth.middleware'

class UploadsRoute {
  private path = '/uploads'
  public router = Router()
  private uploadsController = new UploadsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.delete(
      `${this.path}/images/:id`,
      authMiddleware([UserRoles.ADMIN]),
      this.uploadsController.deleteImage
    )
  }
}

export default UploadsRoute
