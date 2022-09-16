import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment, useState } from 'react'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import './hotel.scss'
import { faBed, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { photos } from '../../data/dummy'
import { Gallery } from '../../components/gallery/Gallery'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import Reserve from '../../components/reserve/Reserve'
import { Toaster } from 'react-hot-toast'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const Hotel = () => {
  const [isShowGallery, setIsShowGallery] = useState(false)
  const [isShowReserve, setIsShowReserve] = useState(false)

  const location = useLocation()
  const hotelId = location.pathname.split('/')[2]

  const { data: hotel, loading } = useFetch(`/hotels/find/${hotelId}`)

  const query = queryString.parse(location.search)
  const nights = query?.nights || 1
  const rooms = query?.rooms || 1

  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleShowReserve = () => {
    if (!user) navigate('/login')

    setIsShowReserve(true)
  }

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
                    <button className="btnReserve" onClick={handleShowReserve}>
                      Reserve
                    </button>
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
                  {hotel.description && (
                    <div className="text" dangerouslySetInnerHTML={{ __html: hotel.description }} />
                  )}

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
                      <b>$ {hotel.cheapestPrice * rooms * nights}</b>{' '}
                      <small>
                        ({rooms} room{rooms > 1 && 's'}, {nights} night{nights > 1 && 's'})
                      </small>
                    </div>

                    <button className="btnReserve" onClick={handleShowReserve}>
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
      <Footer />

      {isShowGallery && <Gallery photos={photos} setIsShowGallery={setIsShowGallery} />}
      {isShowReserve && <Reserve setIsShowReserve={setIsShowReserve} hotelId={hotelId} />}
      <Toaster />
    </Fragment>
  )
}

export default Hotel
