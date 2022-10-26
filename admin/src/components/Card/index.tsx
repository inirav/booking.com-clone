import { Link } from 'react-router-dom'
import { Container, Count, Title } from './styles'

type Props = {
  title: string
  count: number
  path?: string
}

const Card = ({ title, count, path }: Props) => {
  return (
    <Container>
      <Link to={path || ''}>
        <Title>{title}</Title>
        <Count>{count}</Count>
      </Link>
    </Container>
  )
}

export default Card
