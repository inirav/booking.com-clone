import { useQuery } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { BiTrash } from 'react-icons/bi'
import Table from '../../components/Table'
import TableActionCell from '../../components/TableActionCell'
import { getReservations } from '../../services/reservations'
import api from '../../utils/api'
import { default as dayjs } from 'dayjs'

type Props = {}

const Reservations = (props: Props) => {
  const { data: reservation, isSuccess, refetch } = useQuery(['reservations'], getReservations)

  const columns = useMemo(
    () => [
      { Header: 'Property', accessor: 'property' },
      { Header: 'Rooms', accessor: 'rooms' },
      { Header: 'Booking Dates', accessor: 'bookingDates' },
      { Header: 'User', accessor: 'user' },
      { Header: 'Total Amount', accessor: 'totalAmount' },
      { Header: 'Action', accessor: 'action' },
    ],
    []
  )

  const handleActions = useCallback(
    async (id: string, type: 'DELETE' | 'UPDATE') => {
      switch (type) {
        case 'DELETE':
          if (!window.confirm('Are you sure?')) return
          await api.delete(`/reservations/${id}`)
          refetch()
          toast.success('Reservation is deleted successfully')

          break
      }
    },
    [refetch]
  )

  const data = useMemo(
    () =>
      reservation?.map((reservation) => {
        return {
          id: reservation._id,
          property: reservation.property.name,
          rooms: reservation.rooms
            .map(
              (room) =>
                `${room.room.name} (${room.roomNumbers
                  .map((roomNumber) => roomNumber.number)
                  .join(',')})`
            )
            .join(', '),
          bookingDates: reservation.rooms[0].roomNumbers[0].unavailableDates
            .map((date) => dayjs(date).format('YYYY/MM/DD'))
            .join(', '),
          user: reservation.user.username,
          totalAmount: reservation.totalAmount.toFixed(2),
          action: (
            <TableActionCell>
              <BiTrash
                color="red"
                onClick={(e) => {
                  e.stopPropagation()
                  handleActions(reservation._id, 'DELETE')
                }}
              />
            </TableActionCell>
          ),
        }
      }),
    [reservation, handleActions]
  )

  return <>{isSuccess && <Table columns={columns} data={data} />}</>
}

export default Reservations
