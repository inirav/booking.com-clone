import styled from 'styled-components'
import { colors } from '../../../utils/styles'

export const Container = styled.section`
  flex: 0.25;
  background-color: ${colors.warning};
  border-radius: 2px;
  padding: 20px;
  height: fit-content;
`

export const Title = styled.h3`
  font-weight: normal;
  font-size: 20px;
  margin-bottom: 14px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const FormGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const FormLabel = styled.label`
  font-size: 12px;
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #fff;
  padding: 8px;
  border-radius: 2px;
`

export const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
`

export const DateRangePickerContainer = styled.div`
  position: absolute;
  left: 0;
  top: 60px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
  z-index: 2;
`

export const GroupCounterContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
`

export const SearchButton = styled.button`
  border: none;
  outline: none;
  width: 100%;
  height: 50px;
  font-size: 16px;
  background-color: ${colors.primaryLight};
  color: ${colors.textWhite};
  margin-top: 15px;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.primary};
  }
`
