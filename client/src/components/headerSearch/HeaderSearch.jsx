import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './headerSearch.scss'
import { faBed, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useContext, useState } from 'react'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import GuestsInputCounter from '../guestsInputCounter/GuestInputCounter'
import { SearchContext } from '../../contexts/SearchContext'

const HeaderSearch = () => {
  const [city, setCity] = useState('')
  const [isShowDateRangePicker, setIsShowDateRangePicker] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])
  const [isShowGuestCounter, setIsShowGuestCounter] = useState(false)
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  })

  const navigate = useNavigate()
  const { dispatch } = useContext(SearchContext)

  const handleSearch = () => {
    dispatch({ type: 'NEW_SEARCH', payload: { city, dates, guests } })
    navigate('/searchresults')
  }

  return (
    <div className="headerSearch">
      <div className="headerSearch__item">
        <FontAwesomeIcon icon={faBed} fontSize="medium" />
        <input
          type="search"
          placeholder="Where are you going?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div className="headerSearch__item">
        <FontAwesomeIcon icon={faCalendar} fontSize="medium" />
        <span onClick={() => setIsShowDateRangePicker((prev) => !prev)}>
          {`${format(dates[0].startDate, 'MM/dd/yyyy')} - ${format(
            dates[0].endDate,
            'MM/dd/yyyy'
          )}`}
        </span>
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

      <div className="headerSearch__item">
        <FontAwesomeIcon icon={faUser} fontSize="medium" />
        <span onClick={() => setIsShowGuestCounter((prev) => !prev)}>
          {`${guests.adults} adults · ${guests.children} children · ${guests.rooms} rooms`}
        </span>

        {isShowGuestCounter && (
          <GuestsInputCounter
            guests={guests}
            setGuests={setGuests}
            className="guestsInputCounter"
          />
        )}
      </div>
      <div className="btn" onClick={handleSearch}>
        Search
      </div>
    </div>
  )
}

export default HeaderSearch
