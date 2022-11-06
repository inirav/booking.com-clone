import { useQuery } from '@tanstack/react-query'
import Card from '../../components/Card'
import { getPropertyCount } from '../../services/properties'
import { getUserCount } from '../../services/users'
import { Cards } from './styles'

type Props = {}

const Home = (props: Props) => {
  const { data: userCount, isSuccess: isSuccessUserCount } = useQuery(['userCount'], getUserCount)
  const { data: propertyCount, isSuccess: isSuccessPropertyCount } = useQuery(
    ['propertyCount'],
    getPropertyCount
  )

  console.log(propertyCount)

  return (
    <Cards>
      {isSuccessUserCount && <Card title="Users" count={userCount} path="/users" />}
      {isSuccessPropertyCount && (
        <Card title="Properties" count={propertyCount} path="/properties" />
      )}
      <Card title="Reservation" count={40} path="/reservations" />
    </Cards>
  )
}

export default Home
