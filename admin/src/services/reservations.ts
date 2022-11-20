import { Reservation } from '../interfaces/reservations'
import api from '../utils/api'

export const getReservations = async (): Promise<Reservation[]> => {
  const res = await api.get('/reservations')
  return res.data
}

export const getReservationCount = async (): Promise<number> => {
  const res = await api.get('/reservations', { params: { count: true } })
  return res.data
}
