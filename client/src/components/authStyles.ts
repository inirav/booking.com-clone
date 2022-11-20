import styled from 'styled-components'
import { colors } from '../utils/styles'

export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`

export const AuthInner = styled.div`
  width: 100%;
  max-width: 370px;
  margin-top: 15vh;
`

export const AuthTitle = styled.h2`
  margin-bottom: 30px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const FormLabel = styled.label`
  font-size: 14px;
`

export const FormInput = styled.input`
  outline: none;
  padding: 9px 12px;
  border: 1px solid gray;
  border-radius: 2px;
  font-size: 14px;

  &:focus {
    border-color: ${colors.primaryLight};
  }
`

export const AuthText = styled.p`
  font-size: 12px;
`

export const Hr = styled.hr`
  height: 1px;
  border: none;
  background-color: lightgray;
  margin: 20px 0;
`

export const Copyright = styled.div`
  text-align: center;
`

export const CopyrightText = styled.p`
  font-size: 12px;
  margin-bottom: 4px;
`
