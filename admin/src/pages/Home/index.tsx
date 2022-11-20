import { useQuery } from '@tanstack/react-query'
import Card from '../../components/Card'
import { getPropertyCount } from '../../services/properties'
import { getReservationCount } from '../../services/reservations'
import { getUserCount } from '../../services/users'
import { Cards } from './styles'

type Props = {}

const Home = (props: Props) => {
  const { data: userCount, isSuccess: isSuccessUserCount } = useQuery(['userCount'], getUserCount)
  const { data: propertyCount, isSuccess: isSuccessPropertyCount } = useQuery(
    ['propertyCount'],
    getPropertyCount
  )
  const { data: reservationCount, isSuccess: isSuccessReservationCount } = useQuery(
    ['reservationCount'],
    getReservationCount
  )

  return (
    <Cards>
      {isSuccessUserCount && <Card title="Users" count={userCount} path="/users" />}
      {isSuccessPropertyCount && (
        <Card title="Properties" count={propertyCount} path="/properties" />
      )}
      {isSuccessReservationCount && (
        <Card title="Reservation" count={reservationCount} path="/reservations" />
      )}
    </Cards>
  )
}

export default Home
