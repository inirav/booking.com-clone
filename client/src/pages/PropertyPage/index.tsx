import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button'
import { getProperty } from '../../services/properties'
import {
  Container,
  Head,
  PropertyAddress,
  PropertyAddressText,
  PropertyDesc,
  PropertyDescHighlights,
  PropertyHighlights,
  PropertyHighlightsFooter,
  PropertyHighlightsItem,
  PropertyHighlightsRate,
  PropertyHighlightsRateText,
  PropertyHighlightsSubTitle,
  PropertyHighlightsText,
  PropertyHighlightsTitle,
  PropertyImage,
  PropertyImageMore,
  PropertyImages,
  PropertyName,
  PropertyNameAddress,
} from './styles'
import { MdLocationOn, MdHotel } from 'react-icons/md'
import { colors } from '../../utils/styles'
import Gallery from '../../components/Gallery'
import { useContext, useState } from 'react'
import { SearchContext } from '../../contexts/SearchContext'
import { differenceInDays } from 'date-fns'
import RoomSelector from './RoomSelector'

type Props = {}

const PropertyPage = (props: Props) => {
  const [isShowGallery, setShowGallery] = useState(false)
  const [isShowRoomSelector, setShowRoomSelector] = useState(false)
  const {
    state: { dates, group },
  } = useContext(SearchContext)
  const params = useParams()

  const { data: property } = useQuery(['property'], () => getProperty(params.id || ''))
  const nights = Math.abs(differenceInDays(new Date(dates.startDate), new Date(dates.endDate))) + 1
  const rooms = group.rooms

  return (
    <Container>
      {property && (
        <>
          <Head>
            <PropertyNameAddress>
              <PropertyName>{property.name}</PropertyName>
              <PropertyAddress>
                <MdLocationOn color={colors.primaryLight} fontSize={18} />
                <PropertyAddressText>{property.address}</PropertyAddressText>
              </PropertyAddress>
            </PropertyNameAddress>
            <Button variant="primaryLight" paddingX={12} onClick={() => setShowRoomSelector(true)}>
              Reserve
            </Button>
          </Head>
          <PropertyImages>
            {property.images.slice(0, 5).map((image, index) => (
              <PropertyImage src={image} key={index} onClick={() => setShowGallery(true)} />
            ))}
            {property.images.length > 5 && (
              <PropertyImageMore onClick={() => setShowGallery(true)}>
                +{property.images.length - 5} photos
              </PropertyImageMore>
            )}
          </PropertyImages>
          <PropertyDescHighlights>
            <PropertyDesc dangerouslySetInnerHTML={{ __html: property.desc }} />
            <PropertyHighlights>
              <PropertyHighlightsTitle>Property Highlights</PropertyHighlightsTitle>
              <PropertyHighlightsSubTitle>
                Perfect for an {nights}-night stay!
              </PropertyHighlightsSubTitle>
              <PropertyHighlightsItem>
                <MdLocationOn fontSize={24} />
                <PropertyHighlightsText>
                  Top location: Highly rated by recent guests (9.3)
                </PropertyHighlightsText>
              </PropertyHighlightsItem>
              <PropertyHighlightsItem>
                <MdHotel fontSize={40} />
                <PropertyHighlightsText>
                  Want a great night's sleep? This hotel was highly rated for its very comfy beds.
                </PropertyHighlightsText>
              </PropertyHighlightsItem>
              <PropertyHighlightsRate>
                $ {property.cheapestPrice * nights}{' '}
                <PropertyHighlightsRateText>
                  ({rooms} room{rooms > 1 && 's'}, {nights} night{nights > 1 && 's'})
                </PropertyHighlightsRateText>
              </PropertyHighlightsRate>
              <PropertyHighlightsFooter>
                <Button
                  variant="primaryLight"
                  width="100%"
                  paddingY={8}
                  onClick={() => setShowRoomSelector(true)}
                >
                  Reserve
                </Button>
              </PropertyHighlightsFooter>
            </PropertyHighlights>
          </PropertyDescHighlights>

          {isShowGallery && <Gallery images={property.images} setShowGallery={setShowGallery} />}
          {isShowRoomSelector && (
            <RoomSelector
              propertyId={property._id}
              dateRange={dates}
              setShowRoomSelector={setShowRoomSelector}
            />
          )}
        </>
      )}
    </Container>
  )
}

export default PropertyPage
