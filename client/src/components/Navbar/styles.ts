import styled from 'styled-components'
import { colors, sizes } from '../../utils/styles'

export const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  max-width: ${sizes.screenMaxWidth}px;
  margin-left: auto;
  margin-right: auto;
`

export const Left = styled.div``

export const Right = styled.div`
  display: flex;
  gap: 10px;
`

export const Brand = styled.div`
  color: ${colors.textWhite};
  font-size: 24px;
  font-weight: bold;
`

export const NavbarButton = styled.button`
  color: ${colors.primaryLight};
  background-color: ${colors.textWhite};
  padding: 8px 14px;
  font-size: 14px;
  border: 1px solid ${colors.primaryLight};
  cursor: pointer;

  &:hover {
    background-color: aliceblue;
  }
`

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`

export const AvatarText = styled.div`
  color: ${colors.textWhite};
  font-weight: 600;
  font-size: 15px;
`

export const AvatarImage = styled.img`
  width: 25px;
  height: 25px;
  object-fit: contain;
  border-radius: 100%;
  padding: 3px;
  border: 2px solid ${colors.secondary};
  cursor: pointer;
`

export const AvatarMenu = styled.ul`
  position: absolute;
  top: 45px;
  right: 0;
  background-color: #fff;
  font-size: 14px;
  border-radius: 2px;
  width: max-content;
`

export const AvatarMenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;

  &:hover {
    background-color: ${colors.secondary};
  }
`
