import { useContext } from 'react'
import { useState } from 'react'
import '../styles/auth.scss'
import { AuthContext } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import api from '../utils/api'

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleForm = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await api.post('/auth/login', credentials)
      dispatch({ type: 'LOGIN', payload: res.data })
      navigate('/')
    } catch (error) {
      setError(error)
    }

    setLoading(false)
  }

  return (
    <div className="auth">
      <div className="auth-inner">
        <h2>Log In</h2>

        {error && <div className="alert error">{error}</div>}

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

        <p style={{ fontSize: '12px', marginTop: '15px' }}>
          Don't have an account yet? <Link to="/register">Create account</Link>
        </p>

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
