import { Fragment, useContext } from 'react'
import Header from '../../components/header/Header'
import './searchResult.scss'
import Footer from '../../components/footer/Footer'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import PropertyCard from '../../components/propertyCard/PropertyCard'
import SearchBox from '../../components/searchBox/SearchBox'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../contexts/SearchContext'

const SearchResult = () => {
  const { city } = useContext(SearchContext)

  const { data: hotels, loading } = useFetch(`/hotels?city=${city}&limit=10`)

  return (
    <Fragment>
      <Header />
      <div className="searchResultContainer">
        <div className="searchResultWrapper">
          <SearchBox />
          {loading ? (
            'loading...'
          ) : (
            <div className="searchResults">
              <h2>{hotels?.length || 0} properties found</h2>

              {hotels && hotels.map((hotel) => <PropertyCard hotel={hotel} key={hotel._id} />)}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default SearchResult
