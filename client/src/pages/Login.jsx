import { useContext } from 'react'
import { useState } from 'react'
import '../auth.scss'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const { loading, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleForm = async (e) => {
    e.preventDefault()
    dispatch({ type: 'LOGIN_START' })

    try {
      const res = await axios.post('/auth/login', credentials)
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
      navigate('/')
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data })
    }
  }

  return (
    <div className="auth">
      <div className="auth-inner">
        <h2>Log In</h2>
        {error && <div className="alert error">{error.message}</div>}
        <form onSubmit={handleForm}>
          <div className="input-field">
            <label>Username</label>
            <input type="text" id="username" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label>Password</label>
            <input type="password" id="password" onChange={handleChange} required />
          </div>

          <button type="submit" disabled={loading}>
            Login
          </button>
        </form>
        <hr />
        <div className="copyright">
          <p>All rights reserved.</p>
          <p>Copyright (2006 - 2022) - Booking.com™</p>
        </div>
      </div>
    </div>
  )
}

export default Login
