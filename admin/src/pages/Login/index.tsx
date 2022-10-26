import Form from '../../components/Form'
import { Container, FormElement, Title, Wrapper } from './styles'
import * as yup from 'yup'
import Field from '../../components/Form/Field'
import Button from '../../components/Button'
import { login } from '../../services/auth'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FormAction } from '../../components/Form/styles'

type Props = {}

const Login = (props: Props) => {
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (payload: any) => {
    const data = await login(payload)
    dispatch({ type: 'LOGIN', payload: data })
    navigate('/')
  }

  return (
    <Container>
      <Wrapper>
        <Title>Log In</Title>

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
