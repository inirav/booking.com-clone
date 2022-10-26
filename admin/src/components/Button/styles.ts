import styled from 'styled-components'
import Color from 'color'

export const StyledButton = styled.button<{ size?: 'small' | 'large' }>`
  outline: none;
  border: none;
  border-radius: 3px;
  font-weight: 600;
  cursor: pointer;
  padding: 7px 14px;
  width: fit-content;

  &:disabled {
    cursor: not-allowed;
  }

  &.small {
    padding: 5px 10px;
    font-size: 11px;
  }

  &.large {
    padding: 10px 20px;
    font-size: 14px;
  }

  background-color: lightgray;
  color: gray;

  &:hover {
    background-color: ${Color('lightgray').darken(0.05).string()};
  }

  &.primary {
    background-color: #3751ff;
    color: #fff;

    &:hover {
      background-color: ${Color('#3751FF').darken(0.25).string()};
    }
  }
`
