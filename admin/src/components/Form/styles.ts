import styled, { css } from 'styled-components'

import { Form } from 'formik'

export const FormElement = styled(Form)`
  width: 700px;
`

export const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
`

export const StyledField = styled.div<{ isCheckBox: boolean }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 100%;

  ${(props) =>
    props.isCheckBox &&
    css`
      flex-direction: row-reverse;
      justify-content: center;
      gap: 10px;

      ${Label} {
        margin-bottom: 0;
      }
    `}
`

export const ErrorMessage = styled.div`
  font-size: 14px;
  margin-top: 5px;
  color: red;
`

export const FormAction = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
`

export const FieldGroup = styled.div`
  display: flex;
  gap: 15px;
`
