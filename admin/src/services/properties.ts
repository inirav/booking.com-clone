import Property from '../interfaces/properties'
import api from '../utils/api'

export const getProperties = async (): Promise<Property[]> => {
  const res = await api.get('/properties')
  return res.data
}

export const getPropertyById = async (propertyId: string): Promise<Property> => {
  const res = await api.get(`/properties/${propertyId}`)
  return res.data
}

export const createProperty = async (payload: any): Promise<Property> => {
  const res = await api.post('/properties', payload)
  return res.data
}

export const updateProperty = async (propertyId: string, payload: any) => {
  await api.put(`/properties/${propertyId}`, payload)
}
export const deleteProperty = async (propertyId: string) => {
  await api.delete(`/properties/${propertyId}`)
}

export const getPropertyCount = async (): Promise<number> => {
  const res = await api.get('/properties', { params: { count: true } })
  return res.data
}
