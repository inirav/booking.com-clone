import { Form } from 'formik'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: #363740;

  .error-msg {
    margin-bottom: 15px;
  }
`

export const Wrapper = styled.div`
  max-width: 300px;
  width: 100%;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  height: fit-content;
  margin-top: 200px;
`

export const Title = styled.h2`
  margin-bottom: 30px;
`

export const FormElement = styled(Form)``
