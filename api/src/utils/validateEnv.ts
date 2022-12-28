import { cleanEnv, port, str } from 'envalid'

const validateEnv = () => {
  cleanEnv(process.env, {
    JWT_SECRET: str(),
    CLOUDINARY_CLOUD_NAME: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str(),
  })
}

export default validateEnv
