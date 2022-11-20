import styled from 'styled-components'
import { colors } from '../../utils/styles'

export const Container = styled.div`
  padding: 0 25px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  z-index: 3;
`
export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 100px;
  padding: 15px 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${colors.borderGray};
  }
`
export const Title = styled.span``

export const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

export const CounterButton = styled.button`
  outline: none;
  width: 40px;
  height: 40px;
  border: 1px solid ${colors.primaryLight};
  color: ${colors.primaryLight};
  background-color: transparent;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`

export const CounterText = styled.span``
