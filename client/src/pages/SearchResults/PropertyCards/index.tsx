import { useQuery } from '@tanstack/react-query'
import { differenceInDays } from 'date-fns'
import { useContext } from 'react'
import { SearchContext } from '../../../contexts/SearchContext'
import { getProperties } from '../../../services/properties'
import PropertyCard from './PropertyCard'
import { Container, Title } from './styles'

type Props = {}

const PropertyCards = (props: Props) => {
  const { state } = useContext(SearchContext)
  const { data: properties } = useQuery(['properties', state.city], () =>
    getProperties({ city: state.city })
  )
  const nights =
    Math.abs(differenceInDays(new Date(state.dates.startDate), new Date(state.dates.endDate))) + 1

  return (
    <Container>
      <Title>{properties?.length || 0} properties found</Title>
      {properties &&
        properties.map((property) => (
          <PropertyCard
            property={property}
            nights={nights}
            adults={state.group.adults}
            key={property._id}
          />
        ))}
    </Container>
  )
}

export default PropertyCards
