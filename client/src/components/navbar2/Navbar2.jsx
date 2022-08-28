import { faBed, faCar, faPlane, faTaxi, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './navbar2.scss'

const Navbar2 = () => {
  return (
    <nav className="navbar2">
      <ul>
        <li className="selected">
          <FontAwesomeIcon icon={faBed} fontSize="large" />
          <span>Stays</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faPlane} fontSize="large" />
          <span>Flights</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faCar} fontSize="large" />
          <span>Car retals</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faUmbrellaBeach} fontSize="large" />
          <span>Attractions</span>
        </li>
        <li>
          <FontAwesomeIcon icon={faTaxi} fontSize="large" />
          <span>Airport taxis</span>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar2
