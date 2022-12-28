import { DB_HOST, DB_PORT, DB_NAME, DB_URI } from '../config'

export const dbConnection = DB_URI || `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
