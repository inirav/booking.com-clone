import { StyledTextarea } from './styles'

type Props = {
  isError: boolean
}

const Textarea = ({ isError, ...props }: Props) => {
  return <StyledTextarea {...props} className={isError ? 'error' : ''} />
}

export default Textarea
