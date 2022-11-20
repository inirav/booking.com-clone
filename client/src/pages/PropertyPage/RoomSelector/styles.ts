import styled from 'styled-components'
import { colors } from '../../../utils/styles'

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
`

export const Wrapper = styled.div`
  position: relative;
`

export const CloseIcon = styled.div`
  position: absolute;
  top: -25px;
  right: -25px;
  background-color: #fff;
  line-height: 0;
  padding: 6px;
  border-radius: 100%;
  font-size: 10px;
  cursor: pointer;
`

export const Head = styled.div`
  background-color: #fff;
  padding: 20px;
  padding-bottom: 0;
  margin-bottom: 0;
`

export const Title = styled.h3``

export const Rooms = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 0 20px;
  border-radius: 2px;
`

export const Room = styled.div`
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;

  &:not(:last-child) {
    border-bottom: 1px solid ${colors.borderGray};
  }
`

export const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 350px;
`

export const RoomName = styled.h4``

export const RoomDesc = styled.p`
  font-size: 13px;
`

export const RoomPrice = styled.span`
  font-size: 14px;
`

export const RoomNumbers = styled.div`
  display: flex;
  gap: 15px;
`

export const RoomNumber = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  letter-spacing: 0;
`

export const RoomNumberLabel = styled.label``

export const RoomNumberInput = styled.input`
  &:disabled {
    cursor: not-allowed;
  }
`

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`

export const TotalAmount = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  padding: 7px 10px;
  border-radius: 2px;
`
