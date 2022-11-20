import Room from '../interfaces/rooms'
import api from '../utils/api'

export const getRooms = async (propertyId: string): Promise<Room[]> => {
  const res = await api.get(`/properties/${propertyId}/rooms`)
  return res.data
}
