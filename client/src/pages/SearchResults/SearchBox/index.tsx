import { format } from 'date-fns'
import { useContext, useEffect, useRef, useState } from 'react'
import { DateRange } from 'react-date-range'
import { BsCalendarFill } from 'react-icons/bs'
import { FaBed, FaUserAlt } from 'react-icons/fa'
import { useSearchParams } from 'react-router-dom'
import GroupCounter from '../../../components/GroupCounter'
import { SearchContext } from '../../../contexts/SearchContext'
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import useSearch from '../../../hooks/useSearch'
import {
  Container,
  DateRangePickerContainer,
  Form,
  FormGroup,
  FormLabel,
  GroupCounterContainer,
  Input,
  InputContainer,
  SearchButton,
  Title,
} from './styles'

type Props = {}

const SearchBox = (props: Props) => {
  const [isShowGroupCounter, setShowGroupCounter] = useState(false)
  const [isShowDateRangePicker, setShowDateRangePicker] = useState(false)
  const refGroupCounterContainer = useRef<HTMLDivElement>(null)
  const refGroupInput = useRef<HTMLInputElement>(null)
  const refDateRangePickerContainer = useRef<HTMLDivElement>(null)
  const refDateRangeInput = useRef<HTMLInputElement>(null)

  useOnClickOutside([refDateRangePickerContainer, refDateRangeInput], () =>
    setShowDateRangePicker(false)
  )
  useOnClickOutside([refGroupCounterContainer, refGroupInput], () => setShowGroupCounter(false))

  const { city, setCity, dates, setDates, group, setGroup, setSearch } = useSearch()
  const { dispatch } = useContext(SearchContext)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const _city = searchParams.get('city')
    if (_city) {
      setCity(_city)
      dispatch({ type: 'SET_SEARCH', payload: { city: _city } })
    }
  }, [])

  return (
    <Container>
      <Title>Search</Title>

      <Form>
        <FormGroup>
          <FormLabel>Destination name</FormLabel>
          <InputContainer>
            <FaBed fontSize={20} />
            <Input
              type="search"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Where are you going?"
            />
          </InputContainer>
        </FormGroup>
        <FormGroup>
          <FormLabel>Check-in &#38; Check-out date</FormLabel>
          <InputContainer>
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
          </InputContainer>
        </FormGroup>
        <FormGroup>
          <FormLabel>Group</FormLabel>
          <InputContainer>
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
          </InputContainer>
        </FormGroup>

        <SearchButton
          onClick={(e) => {
            e.preventDefault()
            if (!city) return

            setSearch()
          }}
        >
          Search
        </SearchButton>
      </Form>
    </Container>
  )
}

export default SearchBox
