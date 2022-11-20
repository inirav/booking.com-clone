import styled from 'styled-components'
import { colors } from '../../utils/styles'

export const Container = styled.div``

export const Title = styled.h2`
  margin-bottom: 20px;
`

export const Reservations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const Reservation = styled.div`
  display: flex;
  gap: 15px;
  border: 1px solid ${colors.borderGray};
  border-radius: 2px;
  padding: 15px;
`

export const ReservationInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

export const ReservationInfoLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ReservationInfoRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const PropertyImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 2px;
`

export const PropertyName = styled.h3``

export const Room = styled.div``

export const RoomName = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 2px;
`

export const RoomNumbers = styled.div`
  font-size: 13px;
  color: ${colors.textDark};
`

export const TotalAmount = styled.h3``
