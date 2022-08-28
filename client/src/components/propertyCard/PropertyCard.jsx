import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './propertyCard.scss'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const PropertyCard = ({ hotel }) => {
  return (
    <div className="propertyCard">
      <div className="propertyCard__left">
        <Link to={`/hotel/${hotel._id}`}>
          <img src={hotel.photos[0]} alt={hotel.name} />
        </Link>
      </div>
      <div className="propertyCard__right">
        <div className="head">
          <div className="heading">
            <Link to={`/hotel/${hotel._id}`} className="title">
              {hotel.name}
            </Link>
            <div className="location">
              <span>{hotel.address}</span> {hotel.distance} m from centre
            </div>
          </div>
          <div className="rating">
            <div className="rating__text">
              <div>Good</div>
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
            <p>10 nights, 2 adults</p>
            <p className="price">$ {hotel.cheapestPrice}</p>
            <p>+$ 28,649 taxes and charges</p>
            <Link to={`/hotel/${hotel._id}`}>
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
