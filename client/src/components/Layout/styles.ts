import styled from 'styled-components'
import { colors, sizes } from '../../utils/styles'

export const Header = styled.div`
  background-color: ${colors.primary};
  position: relative;
  margin-bottom: 50px;
`
export const Main = styled.main`
  max-width: ${sizes.screenMaxWidth}px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50px;
`
