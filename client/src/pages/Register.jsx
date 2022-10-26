import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/auth.scss'
import api from '../utils/api'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleForm = async (e) => {
    e.preventDefault()
    if (e.target.password.value !== e.target.confirmPassword.value)
      return setError({ message: "Those passwords didn't match" })
    setLoading(true)

    try {
      await api.post('/auth/register', formData)
      navigate('/login')
    } catch (error) {
      setError(error)
    }

    setLoading(false)
  }

  return (
    <div className="auth">
      <div className="auth-inner">
        <h2>Register</h2>

        {error && <div className="alert error">{error.message}</div>}

        <form onSubmit={handleForm}>
          <div className="input-field">
            <label>Username</label>
            <input type="text" id="username" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label>Email</label>
            <input type="email" id="email" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label>Password</label>
            <input type="password" id="password" onChange={handleChange} required />
          </div>
          <div className="input-field">
            <label>Confirm Password</label>
            <input type="password" id="confirmPassword" onChange={handleChange} required />
          </div>

          <button type="submit" disabled={loading}>
            Register
          </button>
        </form>

        <p style={{ fontSize: '12px', marginTop: '15px' }}>
          Already have an account? <Link to="/login">Login</Link>
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

export default Register
