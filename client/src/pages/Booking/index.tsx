import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Button from '../../components/Button'
import { AuthContext } from '../../contexts/AuthContext'
import { deleteReservation, getReservations } from '../../services/reservations'
import {
  Container,
  PropertyImage,
  PropertyName,
  Reservation,
  ReservationInfo,
  ReservationInfoLeft,
  ReservationInfoRight,
  Reservations,
  Room,
  RoomName,
  RoomNumbers,
  Title,
  TotalAmount,
} from './styles'
import toast from 'react-hot-toast'

type Props = {}

const Bookings = (props: Props) => {
  const location = useLocation()
  const { state: auth } = useContext(AuthContext)
  if (!auth.isAuthenticated) return <Navigate to="/login" state={{ from: location.pathname }} />

  const { data: reservations, refetch } = useQuery(['reservations', auth.user], () =>
    getReservations({ user: auth.user?._id as string })
  )

  const cancelReservation = async (reservationId: string) => {
    if (!window.confirm('Are you sure?')) return

    try {
      await deleteReservation(reservationId)
      refetch()
      toast.success('Booking cancelled successfully')
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <Container>
      <Title>Your Bookings</Title>

      <Reservations>
        {reservations &&
          reservations.map((reservation) => (
            <Reservation key={reservation._id}>
              <PropertyImage src={reservation.property.images[0]} />
              <ReservationInfo>
                <ReservationInfoLeft>
                  <PropertyName>{reservation.property.name}</PropertyName>
                  {reservation.rooms.map((room) => (
                    <Room>
                      <RoomName>{room.room.name}</RoomName>
                      <RoomNumbers>
                        ({room.roomNumbers.map((roomNumber) => roomNumber.number).join(',')})
                      </RoomNumbers>
                    </Room>
                  ))}
                </ReservationInfoLeft>
                <ReservationInfoRight>
                  <TotalAmount>₹ {reservation.totalAmount.toFixed(2)}</TotalAmount>
                  <Button
                    variant="danger"
                    fontWeight={700}
                    onClick={() => cancelReservation(reservation._id)}
                  >
                    Cancel
                  </Button>
                </ReservationInfoRight>
              </ReservationInfo>
            </Reservation>
          ))}
      </Reservations>
    </Container>
  )
}

export default Bookings
