import Room from '../interfaces/rooms'
import api from '../utils/api'

export const getRooms = async (propertyId: string): Promise<Room[]> => {
  const res = await api.get(`/properties/${propertyId}/rooms`)
  return res.data
}

export const createRoom = async (propertyId: string, payload: any): Promise<Room> => {
  const res = await api.post(`/properties/${propertyId}/rooms`, payload)
  return res.data
}

export const updateRoom = async (
  propertyId: string,
  roomId: string,
  payload: any
): Promise<Room> => {
  const res = await api.put(`/properties/${propertyId}/rooms/${roomId}`, payload)
  return res.data
}

export const getRoomCount = async (propertyId: string): Promise<number> => {
  const res = await api.get(`/properties/${propertyId}/rooms`, { params: { count: true } })
  return res.data
}
