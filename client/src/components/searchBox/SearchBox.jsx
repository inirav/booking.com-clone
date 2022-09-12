import './searchBox.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import GuestsInputCounter from '../../components/guestsInputCounter/GuestInputCounter'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import queryString from 'query-string'

const SearchBox = ({ query }) => {
  const [city, setCity] = useState(query?.city || '')
  const [dates, setDates] = useState([
    {
      startDate: new Date(query?.checkin_date),
      endDate: new Date(query?.checkout_date),
      key: 'selection',
    },
  ])
  const [guests, setGuests] = useState({
    adults: query?.adults || 2,
    children: query?.children || 0,
    rooms: query?.rooms || 1,
  })
  const [isShowDateRangePicker, setIsShowDateRangePicker] = useState(false)
  const [isShowGuestCounter, setIsShowGuestCounter] = useState(false)

  const navigate = useNavigate()

  const handleSearch = () => {
    const query = {
      city,
      checkin_date: format(dates[0].startDate, 'yyyy-MM-dd'),
      checkout_date: format(dates[0].endDate, 'yyyy-MM-dd'),
      adults: guests.adults,
      children: guests.children,
      rooms: guests.rooms,
    }

    navigate(`/searchresults?${queryString.stringify(query, { sort: false })}`)
  }

  return (
    <div className="searchbox">
      <h3>Search</h3>

      <div className="formField">
        <label>Destination name</label>
        <div className="inputContainer">
          <FontAwesomeIcon icon={faMagnifyingGlass} fontSize="large" />
          <input
            type="text"
            placeholder="Where are you going?"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ cursor: 'text' }}
          />
        </div>
      </div>
      <div className="formField">
        <label>Check-in &#38; Check-out date</label>
        <div className="inputContainer" onClick={() => setIsShowDateRangePicker((prev) => !prev)}>
          <FontAwesomeIcon icon={faCalendar} fontSize="large" />
          <input
            type="text"
            value={`${format(dates[0].startDate, 'MM/dd/yyyy')} - ${format(
              dates[0].endDate,
              'MM/dd/yyyy'
            )}`}
            readOnly
          />
        </div>
        {isShowDateRangePicker && (
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDates([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            className="dateRangePicker"
          />
        )}
      </div>
      <div className="formField">
        <label>Guests</label>
        <div className="inputContainer" onClick={() => setIsShowGuestCounter((prev) => !prev)}>
          <FontAwesomeIcon icon={faUser} fontSize="large" />
          <input
            type="text"
            value={`${guests.adults} adults · ${guests.children} children · ${guests.rooms} rooms`}
            readOnly
          />
        </div>
        {isShowGuestCounter && (
          <GuestsInputCounter
            guests={guests}
            setGuests={setGuests}
            className="guestsInputCounter"
          />
        )}
      </div>

      <button className="searchBtn" onClick={handleSearch}>
        Search
      </button>
    </div>
  )
}

export default SearchBox
