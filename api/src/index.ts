import App from './app'
import AuthRoute from './routes/auth.route'
import IndexRoute from './routes/index.route'
import PropertiesRoute from './routes/properties.route'
import RoomsRoute from './routes/rooms.route'
import UsersRoute from './routes/users.route'
import validateEnv from './utils/validateEnv'

validateEnv()

const app = new App([
  new IndexRoute(),
  new AuthRoute(),
  new UsersRoute(),
  new PropertiesRoute(),
  new RoomsRoute(),
])

app.listen()
