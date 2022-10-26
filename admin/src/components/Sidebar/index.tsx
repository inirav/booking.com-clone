import { Link, useLocation } from 'react-router-dom'
import sidebarMenuItems from '../../constants/sidebarMenuItems'
import { Brand, Container, List, ListItem } from './styles'

type Props = {}

const Sidebar = (props: Props) => {
  const location = useLocation()

  return (
    <Container>
      <Brand>BOOKING.COM</Brand>
      <hr />
      <List>
        {sidebarMenuItems.map((item, index) => (
          <ListItem key={index}>
            <Link to={item.path} className={item.path === location.pathname ? 'active' : ''}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default Sidebar
