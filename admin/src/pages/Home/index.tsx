import Card from '../../components/Card'
import { Cards } from './styles'

type Props = {}

const Home = (props: Props) => {
  return (
    <>
      <Cards>
        <Card title="Users" count={40} path="/users" />
        <Card title="Hotels" count={40} path="/hotels" />
        <Card title="Reservation" count={40} path="/reservations" />
        <Card title="Rooms" count={40} />
      </Cards>
    </>
  )
}

export default Home
