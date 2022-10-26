import styled from 'styled-components'

export const StyledInput = styled.input`
  outline: none;
  border: 1px solid #dfe0eb;
  padding: 7px 8px;
  border-radius: 3px;
  color: #4d4d4d;

  &:focus {
    border-color: #a7b5fc;
  }

  &.error {
    border-color: red;
  }
`
