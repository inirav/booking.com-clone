import Form from '../../components/Form'
import { Container, FormElement, Title, Wrapper } from './styles'
import * as yup from 'yup'
import Field from '../../components/Form/Field'
import Button from '../../components/Button'
import { login } from '../../services/auth'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FormAction } from '../../components/Form/styles'
import Error from '../../components/Error'

type Props = {}

const Login = (props: Props) => {
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleLogin = async (payload: any) => {
    try {
      const data = await login(payload)
      if (data.user.role !== 'admin') return setError('Invalid username and/or password')

      dispatch({ type: 'LOGIN', payload: { accessToken: data.tokenData.token, user: data.user } })
      navigate('/')
    } catch (error) {
      setError('Invalid username and/or password')
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>Log In</Title>

        {error && <Error className="error-msg">{error}</Error>}
        <Form
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={yup.object({
            username: yup.string().required('This field is required'),
            password: yup.string().required('This field is required'),
          })}
          onSubmit={handleLogin}
        >
          <FormElement>
            <Field.Input name="username" label="Username" />
            <Field.Input name="password" label="Password" type="password" />

            <FormAction>
              <Button primary large type="submit">
                Log In
              </Button>
            </FormAction>
          </FormElement>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login
