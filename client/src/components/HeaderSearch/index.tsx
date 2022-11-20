import {
  Container,
  DateRangePickerContainer,
  GroupCounterContainer,
  Input,
  Item,
  SearchButton,
} from './styles'
import { FaBed, FaUserAlt } from 'react-icons/fa'
import { BsCalendarFill } from 'react-icons/bs'
import { useRef, useState } from 'react'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import useOnClickOutside from '../../hooks/useOnClickOutside'
import GroupCounter from '../GroupCounter'
import { useNavigate } from 'react-router-dom'
import useSearch from '../../hooks/useSearch'

type Props = {}

const HeaderSearch = (props: Props) => {
  const [isShowGroupCounter, setShowGroupCounter] = useState(false)
  const [isShowDateRangePicker, setShowDateRangePicker] = useState(false)
  const refGroupCounterContainer = useRef<HTMLDivElement>(null)
  const refGroupInput = useRef<HTMLInputElement>(null)
  const refDateRangePickerContainer = useRef<HTMLDivElement>(null)
  const refDateRangeInput = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useOnClickOutside([refDateRangePickerContainer, refDateRangeInput], () =>
    setShowDateRangePicker(false)
  )
  useOnClickOutside([refGroupCounterContainer, refGroupInput], () => setShowGroupCounter(false))

  const { city, setCity, dates, setDates, group, setGroup, setSearch } = useSearch()

  return (
    <Container>
      <Item>
        <FaBed fontSize={20} />
        <Input
          type="search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Where are you going?"
        />
      </Item>
      <Item>
        <BsCalendarFill fontSize={15} />
        <Input
          type="text"
          value={`${format(dates.startDate, 'MM/dd/yyyy')} - ${format(
            dates.endDate,
            'MM/dd/yyyy'
          )}`}
          onClick={() => setShowDateRangePicker((prev) => !prev)}
          ref={refDateRangeInput}
          readOnly
        />
        {isShowDateRangePicker && (
          <DateRangePickerContainer ref={refDateRangePickerContainer}>
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={[{ ...dates, key: 'selection' }]}
              onChange={(item) =>
                setDates({
                  startDate: item.selection.startDate || dates.startDate,
                  endDate: item.selection.endDate || dates.endDate,
                })
              }
            />
          </DateRangePickerContainer>
        )}
      </Item>
      <Item>
        <FaUserAlt fontSize={16} />
        <Input
          type="text"
          value={`${group.adults} adults · ${group.children} children · ${group.rooms} rooms`}
          onClick={() => setShowGroupCounter((prev) => !prev)}
          ref={refGroupInput}
          readOnly
        />
        {isShowGroupCounter && (
          <GroupCounterContainer ref={refGroupCounterContainer}>
            <GroupCounter group={group} setGroup={(group) => setGroup(group)} />
          </GroupCounterContainer>
        )}
      </Item>
      <SearchButton
        onClick={(e) => {
          e.preventDefault()
          if (!city) return

          setSearch()
          navigate('/search_results')
        }}
      >
        Search
      </SearchButton>
    </Container>
  )
}

export default HeaderSearch
