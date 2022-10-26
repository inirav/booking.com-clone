import { useContext, useRef, useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import { Container, Dropdown, Profile, Title } from './styles'

type Props = {}

const Header = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, () => setIsOpen(false))

  const { state } = useContext(AuthContext)
  const { user } = state

  return (
    <Container>
      <Title>Dashboard</Title>
      <Profile ref={ref}>
        <span className="name">{user?.username}</span>
        <img src={user?.avatar} alt={user?.username} onClick={() => setIsOpen((prev) => !prev)} />

        {isOpen && (
          <Dropdown>
            <li>
              <Link to="/logout">
                <IoIosLogOut />
                <span>Logout</span>
              </Link>
            </li>
          </Dropdown>
        )}
      </Profile>
    </Container>
  )
}

export default Header
