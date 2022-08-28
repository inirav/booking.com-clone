import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.scss'
import { AuthContext } from '../../contexts/AuthContext'

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <Link to="/" className="brand">
          <h2>Booking.com</h2>
        </Link>
      </div>
      <div className="navbar__right">
        {user ? (
          <div>
            Welcome, <b>{user.username}</b>
            <button className="btn" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        ) : (
          <>
            {' '}
            <Link to="/register">
              <button className="btn">Register</button>
            </Link>
            <Link to="/login">
              <button className="btn">Sign in</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
