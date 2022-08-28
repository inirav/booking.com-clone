import './searchBox.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import GuestsInputCounter from '../../components/guestsInputCounter/GuestInputCounter'
import { useContext, useState } from 'react'
import { SearchContext } from '../../contexts/SearchContext'

const SearchBox = () => {
  const { city: _city, dates: _dates, guests: _guests, dispatch } = useContext(SearchContext)

  const [city, setCity] = useState(_city)
  const [dates, setDates] = useState(_dates)
  const [guests, setGuests] = useState(_guests)
  const [isShowDateRangePicker, setIsShowDateRangePicker] = useState(false)
  const [isShowGuestCounter, setIsShowGuestCounter] = useState(false)

  const handleSearch = () => {
    dispatch({ type: 'NEW_SEARCH', payload: { city, dates, guests } })
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
