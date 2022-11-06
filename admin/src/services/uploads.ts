import api from '../utils/api'

export const deleteImage = async (imageId: string) => {
  await api.delete(`/uploads/images/${encodeURIComponent(imageId)}`)
}
