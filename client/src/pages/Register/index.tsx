import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { signup } from '../../services/auth'

type Props = {}

const Register = (props: Props) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (formData.password !== formData.confirmPassword)
      return setErrorMsg("Those password didn't match")

    try {
      await signup({ ...formData, confirmPassword: undefined })
      navigate('/login')
    } catch (error: any) {
      setErrorMsg(error.response.data.message)
    }

    setLoading(false)
  }

  return (
    <AuthContainer>
      <AuthInner>
        <AuthTitle>Register</AuthTitle>

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
            <FormLabel>Email</FormLabel>
            <FormInput type="email" name="email" onChange={handleChange} required />
          </FormGroup>
          <FormGroup style={{ marginBottom: '5px' }}>
            <FormLabel>Password</FormLabel>
            <FormInput type="password" name="password" onChange={handleChange} required />
          </FormGroup>
          <FormGroup style={{ marginBottom: '5px' }}>
            <FormLabel>Confirm Password</FormLabel>
            <FormInput type="password" name="confirmPassword" onChange={handleChange} required />
          </FormGroup>
          <Button
            variant="primaryLight"
            width="100%"
            paddingY={12}
            fontSize={16}
            disabled={isLoading}
          >
            Register
          </Button>
        </Form>

        <AuthText style={{ marginTop: '15px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
            Login
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

export default Register
