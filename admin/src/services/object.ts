import api from '../utils/api'

export const deleteObject = async (id: string) => {
  try {
    await api.delete(`objects/${encodeURIComponent(id)}`)
  } catch (error) {
    throw new Error(`Deleting object ${id} failed`)
  }
}
