import styled, { css } from 'styled-components'

export const Container = styled.div<{ variant: 'primary' | 'danger' }>`
  font-size: 14px;
  font-weight: 500;

  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return css`
          color: #004085;
          background-color: #cce5ff;
        `
      case 'danger':
        return css`
          color: #732524;
          background-color: #f6d7da;
        `
    }
  }}

  padding: 15px 20px;
  border-radius: 2px;
`

export const AlertText = styled.span``
