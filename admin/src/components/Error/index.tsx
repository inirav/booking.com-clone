import { Container } from './styles'
import { MdError } from 'react-icons/md'

type Props = {
  children: React.ReactNode
  className?: string
}

const Error = ({ children, className }: Props) => {
  return (
    <Container className={className}>
      <MdError fontSize={14} />
      <span>{children}</span>
    </Container>
  )
}

export default Error
