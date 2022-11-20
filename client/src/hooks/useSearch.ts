import { useContext, useState } from 'react'
import { SearchContext } from '../contexts/SearchContext'

const useSearch = () => {
  const { state, dispatch } = useContext(SearchContext)

  const [city, setCity] = useState(state.city)
  const [dates, setDates] = useState({
    startDate: state.dates.startDate,
    endDate: state.dates.endDate,
  })
  const [group, setGroup] = useState({
    adults: state.group.adults,
    children: state.group.children,
    rooms: state.group.rooms,
  })

  const setSearch = () => {
    dispatch({ type: 'SET_SEARCH', payload: { city, dates, group } })
  }

  return { city, setCity, dates, setDates, group, setGroup, setSearch }
}

export default useSearch
