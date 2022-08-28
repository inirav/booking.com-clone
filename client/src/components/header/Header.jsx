import Navbar from '../navbar/Navbar'
import Navbar2 from '../navbar2/Navbar2'
import './header.scss'
import HeaderSearch from '../headerSearch/HeaderSearch'
import { Fragment } from 'react'

const Header = ({ isHomePage }) => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <Navbar />
        <Navbar2 />
        {isHomePage && (
          <Fragment>
            <div className="heroBanner">
              <div className="heroBanner__wrapper">
                <h1>Find your next stay</h1>
                <p>Search low prices on hotels, homes and much more...</p>
              </div>
            </div>
            <HeaderSearch className="headerSearch" />
          </Fragment>
        )}
      </div>
    </header>
  )
}

export default Header
