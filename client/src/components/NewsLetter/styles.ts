import styled from 'styled-components'
import { colors } from '../../utils/styles'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.primaryDark};
  color: ${colors.textWhite};
  padding: 45px 0;
`

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 5px;
`

export const SubTitle = styled.span`
  font-size: 16px;
  color: ${colors.textGray};
`

export const Form = styled.form``

export const InputGroup = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 25px;
  margin-bottom: 10px;
`

export const Input = styled.input`
  border: none;
  padding: 10px;
  border-radius: 2px;
  font-size: 20px;
  color: ${colors.textGray};
`

export const FormButton = styled.button`
  border: none;
  outline: none;
  border-radius: 2px;
  background-color: ${colors.primaryLight};
  color: ${colors.textWhite};
  font-size: 18px;
  font-weight: 500;
  padding: 0 30px;
  cursor: pointer;
`

export const CheckBoxGroup = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 10px;
`

export const FormLabel = styled.label`
  font-size: 14px;
`
