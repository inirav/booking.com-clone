import {
  Container,
  Destinations,
  DestinationsSubTitle,
  DestinationsTitle,
  FeaturedProperties,
  FeaturedPropertiesRating,
  FeaturedPropertiesReviews,
  FeaturedPropertiesScore,
  FeaturedPropertiesScoreTitle,
  FeaturedPropertiesText,
  FeaturedPropertiesTitle,
  PostCard,
  PostCardImage,
  PostCardOverlay,
  PostCardOverlaySubText,
  PostCardOverlayText,
  PostCardOverlayTextImage,
  PostCards,
  PropertyTypes,
  PropertyTypesTitle,
  SliderItem,
  SliderItemImage,
  SliderItemSubTitle,
  SliderItemText,
} from './styles'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useQuery } from '@tanstack/react-query'
import {
  countPropertyByCities,
  countPropertyByPropertyTypes,
  getProperties,
} from '../../services/properties'
import { useMemo } from 'react'
import featuredCities from '../../constants/featuredCities'
import propertyTypes from '../../constants/propertyTypes'
import { Link } from 'react-router-dom'
import postcards from '../../constants/postcards'

type Props = {}

const Home = (props: Props) => {
  const [featuredCityNames, featuredCityImages] = useMemo(() => {
    const featuredCityNames = []
    const featuredCityImages = []

    for (const city of featuredCities) {
      featuredCityNames.push(city.name)
      featuredCityImages.push(city.image)
    }

    return [featuredCityNames, featuredCityImages]
  }, [])

  const [propertyTypeTitles, propertyTypeImages] = useMemo(() => {
    const propertyTypeTitles = []
    const propertyTypeImages = []

    for (const propertyType of propertyTypes) {
      propertyTypeTitles.push(propertyType.title)
      propertyTypeImages.push(propertyType.image)
    }

    return [propertyTypeTitles, propertyTypeImages]
  }, [])

  const { data: propertyCountByCities } = useQuery(['propertyCountByCities'], () =>
    countPropertyByCities(featuredCityNames)
  )

  const { data: propertyCountByPropertyTypes } = useQuery(['propertyCountByPropertyTypes'], () =>
    countPropertyByPropertyTypes(propertyTypeTitles)
  )

  const { data: featuredProperties } = useQuery(['featuredProperties'], () =>
    getProperties({ featured: true, limit: 5 })
  )

  return (
    <Container>
      {propertyCountByCities && (
        <Destinations>
          <DestinationsTitle>Explore India</DestinationsTitle>
          <DestinationsSubTitle>
            These popular destinations have a lot to offer
          </DestinationsSubTitle>
          <Slider slidesToShow={5} infinite={false}>
            {propertyCountByCities.map((property, index) => (
              <Link to={`/search_results?city=${property.city}`} key={index}>
                <SliderItem>
                  <SliderItemImage src={featuredCityImages[index]} width={185} height={185} />
                  <SliderItemText>{property.city}</SliderItemText>
                  <SliderItemSubTitle>{property.count} properties</SliderItemSubTitle>
                </SliderItem>
              </Link>
            ))}
          </Slider>
        </Destinations>
      )}

      {propertyCountByPropertyTypes && (
        <PropertyTypes>
          <PropertyTypesTitle>Browse by property type</PropertyTypesTitle>
          <Slider slidesToShow={4} infinite={false}>
            {propertyCountByPropertyTypes.map((property, index) => (
              <Link to={`/search_results?type=${property.type}`} key={index}>
                <SliderItem>
                  <SliderItemImage src={propertyTypeImages[index]} width={240} height={185} />
                  <SliderItemText>{property.type}</SliderItemText>
                  <SliderItemSubTitle>{property.count} properties</SliderItemSubTitle>
                </SliderItem>
              </Link>
            ))}
          </Slider>
        </PropertyTypes>
      )}

      <PostCards>
        {postcards.map((postcard, index) => (
          <Link to={`/search_results?city=${postcard.city}`} key={index}>
            <PostCard>
              <PostCardImage src={postcard.image} />
              <PostCardOverlay>
                <PostCardOverlayText>
                  {postcard.city} <PostCardOverlayTextImage src={postcard.flag} />
                </PostCardOverlayText>
                <PostCardOverlaySubText>{postcard.properties} properties</PostCardOverlaySubText>
              </PostCardOverlay>
            </PostCard>
          </Link>
        ))}
      </PostCards>

      {featuredProperties && (
        <FeaturedProperties>
          <FeaturedPropertiesTitle>Homes guests love</FeaturedPropertiesTitle>
          <Slider slidesToShow={4} infinite={false}>
            {featuredProperties.map((property) => (
              <Link to={`/properties/${property._id}`} key={property._id}>
                <SliderItem>
                  <SliderItemImage src={property.images[0]} width={240} height={240} />
                  <FeaturedPropertiesText>{property.name}</FeaturedPropertiesText>
                  <SliderItemSubTitle>{property.city}</SliderItemSubTitle>
                  <FeaturedPropertiesText style={{ fontWeight: 'bold', marginTop: '10px' }}>
                    Starting form ₹ {property.cheapestPrice}
                  </FeaturedPropertiesText>
                  <FeaturedPropertiesScore>
                    <FeaturedPropertiesRating>9.0</FeaturedPropertiesRating>
                    <FeaturedPropertiesScoreTitle>Superb</FeaturedPropertiesScoreTitle>
                    <FeaturedPropertiesReviews>3203 reviews</FeaturedPropertiesReviews>
                  </FeaturedPropertiesScore>
                </SliderItem>
              </Link>
            ))}
          </Slider>
        </FeaturedProperties>
      )}
    </Container>
  )
}

export default Home
