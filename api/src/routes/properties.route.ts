import { Router } from 'express'
import UserRoles from '../constants/userRoles'
import PropertiesController from '../controllers/properties.controller'
import { CreatePropertyDto } from '../dtos/properties.dto'
import authMiddleware from '../middlewares/auth.middleware'
import validationMiddleware from '../middlewares/validation.middleware'

class PropertiesRoute {
  private path = '/properties'
  public router = Router()
  private propertiesController = new PropertiesController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.propertiesController.getProperties)
    this.router.get(`${this.path}/:id`, this.propertiesController.getPropertyById)
    this.router.post(
      `${this.path}`,
      authMiddleware([UserRoles.ADMIN]),
      validationMiddleware(CreatePropertyDto, 'body'),
      this.propertiesController.createProperty
    )
    this.router.put(
      `${this.path}/:id`,
      authMiddleware([UserRoles.ADMIN]),
      validationMiddleware(CreatePropertyDto, 'body', true),
      this.propertiesController.updateProperty
    )
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware([UserRoles.ADMIN]),
      this.propertiesController.deleteProperty
    )
  }
}

export default PropertiesRoute
