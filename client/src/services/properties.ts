import Property from '../interfaces/properties'
import api from '../utils/api'

export const getProperties = async (filters: {
  [key: string]: string | number | boolean
}): Promise<Property[]> => {
  const res = await api.get('/properties', { params: filters })
  return res.data
}

export const getProperty = async (propertyId: string): Promise<Property> => {
  const res = await api.get(`/properties/${propertyId}`)
  return res.data
}

export const countPropertyByCities = async (
  cities: string[]
): Promise<{ city: string; count: number }[]> => {
  const res = await api.get('/properties', { params: { countByCities: cities.join(',') } })
  return res.data
}

export const countPropertyByPropertyTypes = async (
  propertyTypes: string[]
): Promise<{ type: string; count: number }[]> => {
  const res = await api.get('/properties', {
    params: { countByPropertyTypes: propertyTypes.join(',') },
  })
  return res.data
}
