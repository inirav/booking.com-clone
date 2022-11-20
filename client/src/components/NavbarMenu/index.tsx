import { List, ListItem, Menu, Span } from './styles'
import { FaBed } from 'react-icons/fa'
import { MdFlight, MdAttractions, MdLocalTaxi } from 'react-icons/md'
import { AiFillCar } from 'react-icons/ai'
import { useMemo } from 'react'

type Props = {}

const NavbarMenu = (props: Props) => {
  const items = useMemo(
    () => [
      { title: 'Stays', icon: <FaBed fontSize={22} />, isActive: true },
      { title: 'Flights', icon: <MdFlight fontSize={22} /> },
      { title: 'Car rentals', icon: <AiFillCar fontSize={22} /> },
      { title: 'Attractions', icon: <MdAttractions fontSize={22} /> },
      { title: 'Airport taxis', icon: <MdLocalTaxi fontSize={22} /> },
    ],
    []
  )

  return (
    <Menu>
      <List>
        {items.map((item, index) => (
          <ListItem key={index} isActive={item.isActive || false}>
            {item.icon}
            <Span>{item.title}</Span>
          </ListItem>
        ))}
      </List>
    </Menu>
  )
}

export default NavbarMenu
