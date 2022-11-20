import { AlertText, Container } from './styles'

type Props = {
  variant?: 'primary' | 'danger'
  style?: React.CSSProperties
  children: React.ReactNode
}

const Alert = ({ variant = 'primary', style, children }: Props) => {
  return (
    <Container style={style} variant={variant}>
      <AlertText>{children}</AlertText>
    </Container>
  )
}

export default Alert
