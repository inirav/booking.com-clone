import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './propertyCard.scss'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import getRatingTitle from '../../utils/getRatingTitle'
import { differenceInDays } from 'date-fns'
import queryString from 'query-string'

const PropertyCard = ({ hotel, query }) => {
  const nights =
    Math.abs(differenceInDays(new Date(query?.checkin_date), new Date(query?.checkout_date))) + 1
  const adults = query?.adults || 2
  const rooms = query?.rooms || 1
  const _query = {
    nights,
    rooms,
    checkin_date: query.checkin_date,
    checkout_date: query.checkout_date,
  }
  const hotelLink = `/hotel/${hotel._id}?${queryString.stringify(_query)}`

  return (
    <div className="propertyCard">
      <div className="propertyCard__left">
        <Link to={hotelLink}>
          <img src={hotel.photos[0]} alt={hotel.name} />
        </Link>
      </div>
      <div className="propertyCard__right">
        <div className="head">
          <div className="heading">
            <Link to={hotelLink} className="title">
              {hotel.name}
            </Link>
            <div className="location">
              <span>{hotel.address}</span> {hotel.distance} m from centre
            </div>
          </div>
          <div className="rating">
            <div className="rating__text">
              <div>{getRatingTitle(hotel.rating)}</div>
              <p>{hotel.reviews} reviews</p>
            </div>
            <div className="rating__score">{hotel.rating}</div>
          </div>
        </div>
        {hotel.freeAirportTaxi && <div className="deal">Free airport taxi</div>}
        <div className="body">
          <div className="recommendedUnits">
            {hotel.highlights && <div dangerouslySetInnerHTML={{ __html: hotel.highlights }} />}
            {hotel.freeCancellation && (
              <>
                <p className="green bold">FREE cancellation • No prepayment needed</p>
                <p className="green">You can cancel later, so lock in this great price today.</p>
              </>
            )}
          </div>
          <div className="availabiltyRates">
            <p>
              {nights} night{nights > 1 && 's'}, {adults} adult{adults > 1 && 's'}
            </p>
            <p className="price">$ {hotel.cheapestPrice * nights * rooms}</p>
            <p>+$ 49 taxes and charges</p>
            <Link to={hotelLink}>
              <button className="btnCheckAvailabily">
                See Availabilty <FontAwesomeIcon icon={faAngleRight} fontSize="10px" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard
