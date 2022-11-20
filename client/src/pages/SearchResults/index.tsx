import PropertyCards from './PropertyCards'
import SearchBox from './SearchBox'
import { Container } from './styles'

type Props = {}

const SearchResults = (props: Props) => {
  return (
    <Container>
      <SearchBox />
      <PropertyCards />
    </Container>
  )
}

export default SearchResults
