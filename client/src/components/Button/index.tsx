import { StyledButton } from './styles'

type Props = {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'primaryLight'
  fontSize?: number
  fontWeight?: number | 'bold' | 'bolder'
  children: React.ReactNode
  width?: string
  height?: number
  paddingX?: number
  paddingY?: number
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

const Button = ({
  variant = 'secondary',
  fontSize = 14,
  fontWeight = 500,
  width,
  children,
  paddingX = 20,
  paddingY = 10,
  onClick,
  disabled,
}: Props) => {
  return (
    <StyledButton
      variant={variant}
      fontSize={fontSize}
      fontWeight={fontWeight}
      width={width}
      paddingX={paddingX}
      paddingY={paddingY}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  )
}

export default Button
