import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import hpp from 'hpp'
import morgan from 'morgan'
import { connect, set } from 'mongoose'
import { NODE_ENV, PORT, ORIGIN } from './config'
import { dbConnection } from './databases'
import { Routes } from './interfaces/routes.interface'
import errorMiddleware from './middlewares/error.middleware'
import { logger, stream } from './utils/logger'

class App {
  public app: express.Application
  public env: string
  public port: string | number
  public logFormat: 'dev' | 'combined'
  public origin: string

  constructor(routes: Routes[]) {
    this.app = express()
    this.env = NODE_ENV || 'development'
    this.port = PORT || 5000
    this.logFormat = this.env === 'development' ? 'dev' : 'combined'
    this.origin = ORIGIN || '*'

    this.connectToDatabase()
    this.initializeMiddlewares()
    this.initializeRoutes(routes)
    this.initializeErrorHandling()
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`====================================`)
      logger.info(`========= ENV: ${this.env} =========`)
      logger.info(`🚀 Server listening on the port ${this.port}`)
      logger.info(`====================================`)
    })
  }

  public getServer() {
    return this.app
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true)
    }

    connect(dbConnection)
  }

  private initializeMiddlewares() {
    this.app.use(morgan(this.logFormat, { stream }))
    this.app.use(cors({ origin: this.origin, credentials: true }))
    this.app.use(hpp())
    this.app.use(helmet())
    this.app.use(compression())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router)
    })
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware)
  }
}

export default App
