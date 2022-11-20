import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Alert from '../../components/Alert'
import {
  AuthContainer,
  AuthInner,
  AuthText,
  AuthTitle,
  Copyright,
  CopyrightText,
  Form,
  FormGroup,
  FormInput,
  FormLabel,
  Hr,
} from '../../components/authStyles'
import Button from '../../components/Button'
import { AuthContext } from '../../contexts/AuthContext'
import { login } from '../../services/auth'

type Props = {}

const Login = (props: Props) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setLoading] = useState(false)
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = await login(formData)
      dispatch({ type: 'LOGIN', payload: { accessToken: data.tokenData.token, user: data.user } })
      navigate(location.state?.from || '/')
    } catch (error) {
      setErrorMsg('Invalid username and/or password')
    }

    setLoading(false)
  }

  return (
    <AuthContainer>
      <AuthInner>
        <AuthTitle>Log In</AuthTitle>

        {errorMsg && (
          <Alert variant="danger" style={{ marginBottom: '15px' }}>
            {errorMsg}
          </Alert>
        )}

        <Form onSubmit={handleForm}>
          <FormGroup>
            <FormLabel>Username</FormLabel>
            <FormInput type="text" name="username" onChange={handleChange} required />
          </FormGroup>
          <FormGroup style={{ marginBottom: '5px' }}>
            <FormLabel>Password</FormLabel>
            <FormInput type="password" name="password" onChange={handleChange} required />
          </FormGroup>
          <Button
            variant="primaryLight"
            width="100%"
            paddingY={12}
            fontSize={16}
            disabled={isLoading}
          >
            Login
          </Button>
        </Form>

        <AuthText style={{ marginTop: '15px' }}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
            Create account
          </Link>
        </AuthText>

        <Hr />

        <Copyright>
          <CopyrightText>All rights reserved.</CopyrightText>
          <CopyrightText>Copyright (2006 - 2022) - Booking.com™</CopyrightText>
        </Copyright>
      </AuthInner>
    </AuthContainer>
  )
}

export default Login
