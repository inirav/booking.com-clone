import { Fragment } from 'react'
import Header from '../../components/header/Header'
import './searchResult.scss'
import Footer from '../../components/footer/Footer'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import PropertyCard from '../../components/propertyCard/PropertyCard'
import SearchBox from '../../components/searchBox/SearchBox'
import useFetch from '../../hooks/useFetch'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

const SearchResult = () => {
  const location = useLocation()
  const query = queryString.parse(location.search)
  const { data: hotels, loading } = useFetch(`/hotels?city=${query.city}&limit=10`)

  return (
    <Fragment>
      <Header />
      <div className="searchResultContainer">
        <div className="searchResultWrapper">
          <SearchBox query={query} />
          {loading ? (
            'loading...'
          ) : (
            <div className="searchResults">
              <h2>{hotels?.length || 0} properties found</h2>

              {hotels &&
                hotels.map((hotel) => <PropertyCard hotel={hotel} key={hotel._id} query={query} />)}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default SearchResult
