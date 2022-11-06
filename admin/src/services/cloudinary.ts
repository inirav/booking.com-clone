import axios from 'axios'

const config = {
  BASE_URL: 'https://api.cloudinary.com/v1_1',
  CLOUD_NAME: 'dw9w5x9qc',
  RESOURCE_TYPE: 'image',
  UPLOAD_PRESET: 'twybyvyb',
  FOLDER: 'booking-com',
}

const url = `${config.BASE_URL}/${config.CLOUD_NAME}/${config.RESOURCE_TYPE}/upload`

export const upload_image = async (file: File): Promise<any> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', config.UPLOAD_PRESET)
  formData.append('folder', config.FOLDER)

  const res = await axios.post(url, formData)

  return res.data
}
