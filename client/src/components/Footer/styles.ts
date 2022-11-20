import styled from 'styled-components'
import { colors, sizes } from '../../utils/styles'

export const Container = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 0;

  max-width: ${sizes.screenMaxWidth}px;
  margin-left: auto;
  margin-right: auto;
`

export const Links = styled.nav`
  display: flex;
  justify-content: space-between;
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
`

export const ListItem = styled.li`
  font-size: 12px;
  color: ${colors.primaryLight};
  cursor: pointer;
  text-transform: capitalize;
`
export const CopyrightText = styled.p`
  font-size: 10px;
  margin-top: 15px;
`
