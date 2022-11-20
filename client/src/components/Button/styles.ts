import styled, { css } from 'styled-components'
import { colors } from '../../utils/styles'
import Color from 'color'

export const StyledButton = styled.button<{
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'primaryLight'
  fontSize: number
  fontWeight: number | 'bold' | 'bolder'
  width?: string
  paddingX: number
  paddingY: number
}>`
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => colors[props.variant]};
  color: ${(props) => (props.variant === 'secondary' ? colors.textDark : colors.textWhite)};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.fontSize}px;
  padding: ${(props) => `${props.paddingY}px ${props.paddingX}px`};
  width: ${(props) => (props.width ? props.width : 'max-content')};
  height: fit-content;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => Color(colors[props.variant]).darken(0.1).toString()};
  }
`
