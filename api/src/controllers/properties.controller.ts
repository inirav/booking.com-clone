import { NextFunction, Request, Response } from 'express'
import { CreatePropertyDto } from '../dtos/properties.dto'
import PropertyService from '../services/properties.service'

class PropertiesController {
  private propertyService = new PropertyService()

  public getProperties = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { count, countByCities, countByPropertyTypes, ...filters } = req.query
      const isCount: boolean = count && count === 'true' ? true : false

      if (countByPropertyTypes) {
        const types = (countByPropertyTypes as string).split(',')
        const counts = await Promise.all(
          types.map(async (type) => ({
            type,
            count: await this.propertyService.countProperties({ type }),
          }))
        )

        res.status(200).json(counts)
      } else if (countByCities) {
        const cities = (countByCities as string).split(',')
        const counts = await Promise.all(
          cities.map(async (city) => ({
            city,
            count: await this.propertyService.countProperties({ city }),
          }))
        )

        res.status(200).json(counts)
      } else if (isCount) {
        const totalCount = await this.propertyService.countProperties(filters)

        res.status(200).json(totalCount)
      } else {
        const propertiesData = await this.propertyService.findProperties(filters)

        res.status(200).json(propertiesData)
      }
    } catch (error) {
      next(error)
    }
  }

  public getPropertyById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const propertyId: string = req.params.id
      const findOnePropertyData = await this.propertyService.findPropertyById(propertyId)

      res.status(200).json(findOnePropertyData)
    } catch (error) {
      next(error)
    }
  }

  public createProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const propertyData: CreatePropertyDto = req.body
      const createPropertyData = await this.propertyService.createProperty(propertyData)

      return res.status(201).json(createPropertyData)
    } catch (error) {
      next(error)
    }
  }

  public updateProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const propertyId = req.params.id
      const propertyData = req.body

      const updatePropertyData = await this.propertyService.updateProperty(propertyId, propertyData)

      res.status(200).json(updatePropertyData)
    } catch (error) {
      next(error)
    }
  }

  public deleteProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const propertyId = req.params.id
      await this.propertyService.deleteProperty(propertyId)

      res.sendStatus(204)
    } catch (error) {
      next(error)
    }
  }
}

export default PropertiesController
