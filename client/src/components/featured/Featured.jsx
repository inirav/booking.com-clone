import './featured.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import useFetch from '../../hooks/useFetch'
import { images } from '../../data'

const Featured = () => {
  const { data: countByCities } = useFetch(
    '/hotels/countByCities?cities=Goa,Mumbai,New Delhi,Lonavala,Bangaluru,Jaipur,Pondicherry'
  )
  const { data: countByPropertyTypes } = useFetch(
    '/hotels/countByPropertyTypes?types=Hotel,Apartment,Resort,Villa,Cabin,Cottage'
  )
  const { data: featuredHotels } = useFetch('/hotels?featured=true&limit=5')

  return (
    <div className="featured">
      <div className="featured__wrapper">
        {countByCities && (
          <div className="carousel">
            <h2 className="carousel__title">Explore United States</h2>
            <p className="carousel__subtitle">These popular destinations have a lot to offer</p>

            <Slider slidesToShow={5} infinite={false} className="slider">
              {countByCities.map((hotel, index) => (
                <div className="slider__item" key={index}>
                  <img src={images.places[hotel.city]} alt={hotel.city} />
                  <h3>{hotel.city}</h3>
                  <span>{hotel.count} properties</span>
                </div>
              ))}
            </Slider>
          </div>
        )}

        {countByPropertyTypes && (
          <div className="carousel propertyTypes">
            <h2 className="carousel__title">Browse by property type</h2>

            <Slider slidesToShow={4} infinite={false} className="slider">
              {countByPropertyTypes &&
                countByPropertyTypes.map((hotel, index) => (
                  <div className="slider__item" key={index}>
                    <img src={images.propertyTypes[hotel.type]} alt={hotel.type} />
                    <h3>{hotel.type}s</h3>
                    <span>
                      {hotel.count} {hotel.type.toLowerCase()}s
                    </span>
                  </div>
                ))}
            </Slider>
          </div>
        )}

        <div className="postcardContainer">
          <div className="postcard">
            <div className="postcard__item">
              <img src={images.places.Brooklyn} alt="" />
              <div className="postcard__overlay">
                <h2>
                  Brooklyn <img src={images.flags.USA} alt="" valign="middle"></img>
                </h2>
                <span>18901 properties</span>
              </div>
            </div>
            <div className="postcard__item">
              <img src={images.places.Amsterdam} alt="" />
              <div className="postcard__overlay">
                <h2>
                  Amsterdam <img src={images.flags.Netherlands} alt="" valign="middle"></img>
                </h2>
                <span>1431 properties</span>
              </div>
            </div>
          </div>

          <div className="postcard">
            <div className="postcard__item">
              <img src={images.places['New York']} alt="" />
              <div className="postcard__overlay">
                <h2>
                  New York <img src={images.flags.USA} alt="" valign="middle"></img>
                </h2>
                <span>1500 properties</span>
              </div>
            </div>
            <div className="postcard__item">
              <img src={images.places['Rio de Janeiro']} alt="" />
              <div className="postcard__overlay">
                <h2>
                  Rio de Janeiro <img src={images.flags.Brazil} alt="" valign="middle"></img>
                </h2>
                <span>1901 properties</span>
              </div>
            </div>

            <div className="postcard__item">
              <img src={images.places['Los Angeles']} alt="" />
              <div className="postcard__overlay">
                <h2>
                  Los Angeles <img src={images.flags.USA} alt="" valign="middle"></img>
                </h2>
                <span>17001 properties</span>
              </div>
            </div>
          </div>
        </div>

        {featuredHotels && (
          <div className="carousel lovedHomes">
            <h2 className="carousel__title">Homes guests love</h2>

            <Slider slidesToShow={4} infinite={false} className="slider">
              {featuredHotels &&
                featuredHotels.map((hotel) => (
                  <div className="slider__item" key={hotel._id}>
                    <img src={hotel.photos[0]} alt={hotel.name} />
                    <p>{hotel.name}</p>
                    <p className="location">{hotel.city}</p>
                    <p className="price">Starting from ${hotel.cheapestPrice}</p>
                    <div className="ratingContainer">
                      <span className="rating">{hotel.rating}</span>
                      <span className="scoreTitle">Superb</span>
                      <span className="reviews">{hotel.reviews || 0} reviews</span>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  )
}

export default Featured
