import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './reserve.scss'
import useFetch from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import getDates from '../../utils/getDates'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Reserve = ({ setIsShowReserve, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([])
  const location = useLocation()
  const query = queryString.parse(location.search)

  const { data: rooms } = useFetch(`/properties/${hotelId}/rooms`)

  const dates = getDates(new Date(query.checkin_date), new Date(query.checkout_date))

  const isRoomAvailable = (unavailableDates) =>
    !unavailableDates.some((date) => dates.includes(new Date(date).getTime()))

  const handleSelection = (e) => {
    const id = e.target.value
    const checked = e.target.checked

    setSelectedRooms(checked ? [...selectedRooms, id] : selectedRooms.filter((el) => el !== id))
  }

  const handleReservation = async () => {
    if (selectedRooms.length === 0) return

    try {
      await Promise.all(
        selectedRooms.map((roomId) => axios.put(`/rooms/availability/${roomId}`, { dates }))
      )
      setIsShowReserve(false)
      toast.success('Hotel room(s) reserved successfully')
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="reserve">
      <div className="wrapper">
        <FontAwesomeIcon
          icon={faXmarkCircle}
          className="icon close"
          onClick={() => setIsShowReserve(false)}
        />

        <div className="head">
          <h3>Select your rooms:</h3>
        </div>
        <div className="rooms">
          {rooms &&
            rooms.map((room) => (
              <div className="room" key={room._id}>
                <div className="info">
                  <h4>{room.name}</h4>
                  <p>{room.desc}</p>
                  <p>
                    Price: <b>$ {room.price}</b>
                  </p>
                </div>
                <div className="room-numbers">
                  {room.roomNumbers?.map((roomNumber, index) => (
                    <div key={index}>
                      <label>{roomNumber.number}</label>
                      <input
                        type="checkbox"
                        value={roomNumber._id}
                        onChange={handleSelection}
                        disabled={!isRoomAvailable(roomNumber.unavailableDates)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        <div className="footer">
          <div className="total">
            <span>
              Total Price: <b>$ 3000</b>
            </span>
          </div>
          <button onClick={handleReservation}>I'll Reserve</button>
        </div>
      </div>
    </div>
  )
}

export default Reserve
