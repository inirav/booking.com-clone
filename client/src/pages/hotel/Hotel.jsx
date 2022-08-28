import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment, useContext, useState } from 'react'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import './hotel.scss'
import { faBed, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { photos } from '../../data/dummy'
import { Gallery } from '../../components/gallery/Gallery'
import useFetch from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'
import { SearchContext } from '../../contexts/SearchContext'
import differenceInDays from 'date-fns/differenceInDays/index.js'

const Hotel = () => {
  const [isShowGallery, setIsShowGallery] = useState(false)

  const location = useLocation()
  const hotelId = location.pathname.split('/')[2]

  const { data: hotel, loading } = useFetch(`/hotels/find/${hotelId}`)

  const { dates, guests } = useContext(SearchContext)
  const nights = Math.abs(differenceInDays(dates[0].startDate, dates[0].endDate)) + 1

  return (
    <Fragment>
      <Header />
      {loading
        ? 'loading...'
        : hotel && (
            <div className="hotel">
              <div className="hotel-inner">
                <div className="head">
                  <div>
                    <h2>{hotel.name}</h2>
                    <div className="location">
                      <FontAwesomeIcon icon={faLocationDot} className="icon" />
                      <span>{hotel.address}</span>
                    </div>
                  </div>
                  <div>
                    <button className="btnReserve">Reserve</button>
                  </div>
                </div>
                <div className="photos">
                  {hotel.photos.slice(0, 5).map((photo, index) => (
                    <img src={photo} alt="" key={index} onClick={() => setIsShowGallery(true)} />
                  ))}
                  <div className="more" onClick={() => setIsShowGallery(true)}>
                    +54 photos
                  </div>
                </div>
                <div className="description">
                  <div className="text">{hotel.description}</div>
                  <div className="property-highlights">
                    <h3 className="title">Property Highlights</h3>
                    <div className="bold">Perfect for an {nights}-night stay!</div>
                    <div className="item">
                      <FontAwesomeIcon icon={faLocationDot} fontSize="large" />
                      <span>Top location: Highly rated by recent guests ({hotel.rating})</span>
                    </div>
                    <div className="item">
                      <FontAwesomeIcon icon={faBed} fontSize="large" />
                      <span>
                        Want a great night's sleep? This hotel was highly rated for its very comfy
                        beds.
                      </span>
                    </div>
                    <div className="item calc">
                      <b>$ {hotel.cheapestPrice * guests.rooms * nights}</b>{' '}
                      <small>
                        [{guests.rooms} room(s), {nights} night(s)]
                      </small>
                    </div>

                    <button className="btnReserve">Reserve</button>
                  </div>
                </div>
              </div>
            </div>
          )}
      <Footer />

      {isShowGallery && <Gallery photos={photos} setIsShowGallery={setIsShowGallery} />}
    </Fragment>
  )
}

export default Hotel
