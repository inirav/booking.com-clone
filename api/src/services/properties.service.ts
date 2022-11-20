import { CreatePropertyDto } from '../dtos/properties.dto'
import { HttpException } from '../exceptions/HttpException'
import { Property } from '../interfaces/properties.interface'
import propertyModel from '../models/properties.model'
import reservationModel from '../models/reservatons.model'
import roomModel from '../models/rooms.models'
import { isEmpty } from '../utils/util'

class PropertyService {
  public async findProperties(filters: any = {}): Promise<Property[]> {
    const properties: Property[] = await propertyModel.find(filters)

    return properties
  }

  public async findPropertyById(propertyId: string): Promise<Property> {
    if (isEmpty(propertyId)) throw new HttpException(400, 'PropertyId is empty')

    const findProperty: Property | null = await propertyModel.findOne({ _id: propertyId })
    if (!findProperty) throw new HttpException(409, "Property doesn't exist")

    return findProperty
  }

  public async createProperty(propertyData: CreatePropertyDto): Promise<Property> {
    if (isEmpty(propertyData)) throw new HttpException(400, 'propertyData is empty')

    const createPropertyData: Property = await propertyModel.create(propertyData)

    return createPropertyData
  }

  public async updateProperty(
    propertyId: string,
    propertyData: CreatePropertyDto
  ): Promise<Property> {
    if (isEmpty(propertyData)) throw new HttpException(400, 'propertyData is empty')

    const updatePropertyById: Property | null = await propertyModel.findByIdAndUpdate(
      propertyId,
      propertyData,
      { new: true }
    )
    if (!updatePropertyById) throw new HttpException(400, "Property doesn't exist")

    return updatePropertyById
  }

  public async deleteProperty(propertyId: string): Promise<Property> {
    const deletePropertyById: Property | null = await propertyModel.findByIdAndDelete(propertyId)
    if (!deletePropertyById) throw new HttpException(400, "Property doesn't exit")

    // Deleting related rooms and reservations
    await roomModel.deleteMany({ _id: { $in: deletePropertyById.rooms } })
    await reservationModel.deleteMany({ property: deletePropertyById._id })

    return deletePropertyById
  }

  public async countProperties(filters: any = {}): Promise<number> {
    const count = await propertyModel.countDocuments(filters)

    return count
  }
}

export default PropertyService
