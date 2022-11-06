import { AiFillDashboard } from 'react-icons/ai'
import { FiUsers } from 'react-icons/fi'
import { RiHotelLine } from 'react-icons/ri'
import { BsCalendarCheck } from 'react-icons/bs'

type Types = {
  title: string
  icon: JSX.Element
  path: string
}[]

const sidebarMenuItems: Types = [
  { title: 'Dashbaord', icon: <AiFillDashboard className="icon" />, path: '/' },
  { title: 'Users', icon: <FiUsers className="icon" />, path: '/users' },
  { title: 'Properties', icon: <RiHotelLine className="icon" />, path: '/properties' },
  { title: 'Reservations', icon: <BsCalendarCheck className="icon" />, path: '/reservations' },
]

export default sidebarMenuItems
