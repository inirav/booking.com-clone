import styled from 'styled-components'
import { colors, sizes } from '../../utils/styles'
import { DateRange } from 'react-date-range'
import GroupCounter from '../GroupCounter'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  color: ${colors.textDark};
  font-size: 14px;
  border: 4px solid ${colors.warning};
  border-radius: 5px;
  max-height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -27px;
  width: 100%;
  z-index: 2;

  max-width: ${sizes.screenMaxWidth}px;
  margin-left: auto;
  margin-right: auto;
`
export const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 50px;
  padding: 0 15px;
  cursor: pointer;
  position: relative;

  &:not(:first-child) {
    border-left: 4px solid ${colors.warning};
  }
`
export const Input = styled.input`
  border: none;
  outline: none;
  min-width: 200px;

  &::placeholder {
    font-size: 14px;
    color: ${colors.textDark};
  }
`
export const SearchButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-left: 4px solid ${colors.warning};
  height: 50px;
  padding: 0 15px;
  background-color: ${colors.primaryLight};
  font-size: 20px;
  color: ${colors.textWhite};
  cursor: pointer;
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
