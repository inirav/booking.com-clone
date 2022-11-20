import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useContext, useMemo, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'
import { AuthContext } from '../../../contexts/AuthContext'
import { createReservation } from '../../../services/reservations'
import { getRooms } from '../../../services/rooms'
import getDatesFromRange from '../../../utils/getDatesFromRange'
import { Container, Footer, TotalAmount } from './styles'
import {
  CloseIcon,
  Room,
  RoomDesc,
  RoomInfo,
  RoomName,
  RoomNumber,
  RoomNumberInput,
  RoomNumberLabel,
  RoomNumbers,
  RoomPrice,
  Rooms,
  Wrapper,
} from './styles'
import toast from 'react-hot-toast'

type Props = {
  propertyId: string
  dateRange: { startDate: Date; endDate: Date }
  setShowRoomSelector: React.Dispatch<React.SetStateAction<boolean>>
}

const RoomSelector = ({ propertyId, dateRange, setShowRoomSelector }: Props) => {
  const location = useLocation()
  const { state: auth } = useContext(AuthContext)
  if (!auth.isAuthenticated) return <Navigate to="/login" state={{ from: location.pathname }} />

  const [selectedRoomNumbers, setSelectedRoomNumbers] = useState<string[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const navigation = useNavigate()
  const { data: rooms } = useQuery(['room', propertyId], () => getRooms(propertyId))

  const dates = getDatesFromRange(dateRange.startDate, dateRange.endDate)
  const isRoomAvailable = useMemo(
    () => (unavailableDates: Date[]) =>
      !unavailableDates.some((date) => dates.includes(new Date(date).getTime())),
    []
  )
  const handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const roomNumberId: string = e.target.value
    const checked: boolean = e.target.checked

    setSelectedRoomNumbers((prev) =>
      checked ? [...prev, roomNumberId] : prev.filter((item) => item !== roomNumberId)
    )

    // Time complexity: O(n^2)
    rooms?.forEach((room) => {
      room.roomNumbers.forEach((roomNumber) => {
        if (roomNumber._id === roomNumberId) {
          setTotalAmount((prev) => (checked ? prev + room.price : prev - room.price))
          return
        }
      })
    })
  }

  const handleReservation = async () => {
    if (selectedRoomNumbers.length === 0) return

    //<--- Create payload --->
    const _rooms: {
      id: string
      roomNumbers: { number: number; unavailableDates: number[] }[]
    }[] = []

    // Time complexity: O(n^2)
    for (const room of rooms || []) {
      for (const roomNumber of room.roomNumbers) {
        if (selectedRoomNumbers.includes(roomNumber._id)) {
          const objIndex = _rooms.findIndex((item) => item.id === room._id)
          if (objIndex !== -1) {
            _rooms[objIndex].roomNumbers.push({
              number: roomNumber.number,
              unavailableDates: dates,
            })
          } else {
            _rooms.push({
              id: room._id,
              roomNumbers: [{ number: roomNumber.number, unavailableDates: dates }],
            })
          }
        }
      }
    }

    const payload = {
      user: auth.user?._id,
      property: propertyId,
      rooms: _rooms,
      totalAmount,
    }

    try {
      await createReservation(payload)
      navigation('/bookings')
      toast.success('Booking successful')
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <Container>
      <Wrapper>
        <CloseIcon onClick={() => setShowRoomSelector(false)}>
          <ImCross />
        </CloseIcon>

        <Rooms>
          {rooms &&
            rooms.map((room) => (
              <Room key={room._id}>
                <RoomInfo>
                  <RoomName>{room.name}</RoomName>
                  <RoomDesc dangerouslySetInnerHTML={{ __html: room.desc }} />
                  <RoomPrice>
                    Price: <b>$ {room.price}</b>
                  </RoomPrice>
                </RoomInfo>
                <RoomNumbers>
                  {room.roomNumbers.map((roomNumber) => (
                    <RoomNumber key={roomNumber._id}>
                      <RoomNumberLabel>{roomNumber.number}</RoomNumberLabel>
                      <RoomNumberInput
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelection}
                        disabled={!isRoomAvailable(roomNumber.unavailableDates)}
                      />
                    </RoomNumber>
                  ))}
                </RoomNumbers>
              </Room>
            ))}
        </Rooms>

        <Footer>
          <TotalAmount>
            Total Amount: <b>$ {totalAmount.toFixed(2)}</b>
          </TotalAmount>
          <Button variant="primaryLight" onClick={handleReservation}>
            I'll Reserve
          </Button>
        </Footer>
      </Wrapper>
    </Container>
  )
}

export default RoomSelector
