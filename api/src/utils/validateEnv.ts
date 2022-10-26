import { cleanEnv, port, str } from 'envalid'

const validateEnv = () => {
  cleanEnv(process.env, {
    DB_HOST: str(),
    DB_PORT: port(),
    DB_NAME: str(),
    JWT_SECRET: str(),
    CLOUDINARY_CLOUD_NAME: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str(),
  })
}

export default validateEnv
