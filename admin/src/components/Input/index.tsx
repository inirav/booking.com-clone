import { StyledInput } from './styles'

type Props = {
  isError: boolean
  type?: string
}

const Input = ({ isError, type, ...props }: Props) => {
  return <StyledInput type={type} {...props} className={isError ? 'error' : ''} />
}

export default Input
