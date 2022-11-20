import { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import {
  Avatar,
  AvatarImage,
  AvatarMenu,
  AvatarMenuItem,
  AvatarText,
  Brand,
  Left,
  NavbarButton,
  Right,
  StyledNavbar,
} from './styles'
import { RiHotelLine } from 'react-icons/ri'
import { MdLogout } from 'react-icons/md'
import useOnClickOutside from '../../hooks/useOnClickOutside'

type Props = {}

const Navbar = (props: Props) => {
  const [isShowAvatarMenu, setShowAvatarMenu] = useState(false)
  const refAvatarMenu = useRef(null)
  const refAvatarImg = useRef(null)
  const { state: auth } = useContext(AuthContext)

  useOnClickOutside([refAvatarMenu, refAvatarImg], () => setShowAvatarMenu(false))

  return (
    <StyledNavbar>
      <Left>
        <Link to="/">
          <Brand>Booking.com</Brand>
        </Link>
      </Left>
      <Right>
        {auth.isAuthenticated ? (
          <Avatar>
            <AvatarText>{auth.user?.username}</AvatarText>
            <AvatarImage
              src={auth.user?.avatar}
              ref={refAvatarImg}
              onClick={() => setShowAvatarMenu((prev) => !prev)}
            />
            {isShowAvatarMenu && (
              <AvatarMenu ref={refAvatarMenu}>
                <Link to="/bookings">
                  <AvatarMenuItem>
                    <RiHotelLine fontSize={20} /> Bookings
                  </AvatarMenuItem>
                </Link>
                <Link to="/logout">
                  <AvatarMenuItem>
                    <MdLogout fontSize={20} /> Logout
                  </AvatarMenuItem>
                </Link>
              </AvatarMenu>
            )}
          </Avatar>
        ) : (
          <>
            <Link to="/register">
              <NavbarButton>Register</NavbarButton>
            </Link>
            <Link to="/login">
              <NavbarButton>Log in</NavbarButton>
            </Link>
          </>
        )}
      </Right>
    </StyledNavbar>
  )
}

export default Navbar
