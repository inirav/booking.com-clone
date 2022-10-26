import { StyledButton } from './styles'
import { Ring } from '@uiball/loaders'

type Props = {
  children: React.ReactNode
  small?: true
  large?: true
  primary?: true
  type?: 'button' | 'submit'
  onClick?: () => void
  isProcessing?: boolean
  style?: React.CSSProperties
}

const Button = ({
  children,
  small,
  large,
  primary,
  type = 'button',
  onClick,
  isProcessing,
  style,
}: Props) => {
  return (
    <StyledButton
      className={`${small && 'small'} ${large && 'large'} ${primary && 'primary'}`}
      type={type}
      onClick={onClick}
      disabled={isProcessing}
      style={style}
    >
      {isProcessing ? <Ring size={13} color="#fff" lineWeight={8} /> : children}
    </StyledButton>
  )
}

export default Button
