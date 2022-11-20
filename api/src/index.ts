import App from './app'
import AuthRoute from './routes/auth.route'
import IndexRoute from './routes/index.route'
import PropertiesRoute from './routes/properties.route'
import ReservationRoutes from './routes/reservations.routes'
import RoomsRoute from './routes/rooms.route'
import UploadsRoute from './routes/uploads.route'
import UsersRoute from './routes/users.route'
import validateEnv from './utils/validateEnv'

validateEnv()

const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new UsersRoute(),
  new PropertiesRoute(),
  new RoomsRoute(),
  new UploadsRoute(),
  new ReservationRoutes(),
])

app.listen()
