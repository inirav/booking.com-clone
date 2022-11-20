import styled from 'styled-components'
import { colors } from '../../utils/styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const Destinations = styled.section`
  .slick-arrow::before {
    color: gray;
  }
`

export const DestinationsTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 3px;
`

export const DestinationsSubTitle = styled.p`
  font-size: 16px;
  color: ${colors.textDark};
  margin-bottom: 20px;
`

export const SliderItem = styled.div``

export const SliderItemImage = styled.img`
  object-fit: cover;
  border-radius: 3px;
  background-color: ${colors.skeletonBackgound};
  margin-bottom: 15px;
`

export const SliderItemText = styled.h3`
  font-size: 16px;
  text-transform: capitalize;
  margin-bottom: 5px;
`

export const SliderItemSubTitle = styled.span`
  font-size: 14px;
  color: ${colors.textGray};
`

export const PropertyTypes = styled.section`
  .slick-arrow::before {
    color: gray;
  }
`

export const PropertyTypesTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 18px;
`

export const PostCards = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  overflow: hidden;

  & > * {
    grid-column: span 3;

    &:nth-child(n + 3) {
      grid-column: span 2;
    }
  }
`

export const PostCard = styled.div`
  height: 270px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: ${colors.skeletonBackgound};
`

export const PostCardImage = styled.img`
  border-radius: 3px;
`

export const PostCardOverlay = styled.div`
  width: 100%;
  position: absolute;
  color: ${colors.textWhite};
  top: 0;
  left: 0;
  padding-left: 20px;
  padding-top: 20px;
  background: linear-gradient(to bottom, rgba(0, 27, 65, 0.65) 0, rgba(0, 27, 65, 0) 100%);
  text-shadow: 1px 1px 1px #000;
`

export const PostCardOverlayText = styled.h2`
  font-size: 28px;
  text-transform: capitalize;
`

export const PostCardOverlayTextImage = styled.img`
  vertical-align: middle;
`

export const PostCardOverlaySubText = styled.span`
  font-size: 16px;
`

export const FeaturedProperties = styled.section``

export const FeaturedPropertiesTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 18px;
`

export const FeaturedPropertiesText = styled.p`
  font-size: 14px;
  text-transform: capitalize;
`

export const FeaturedPropertiesScore = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
`

export const FeaturedPropertiesRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  color: ${colors.textWhite};
  width: 28px;
  height: 28px;
  font-weight: 500;
  border-radius: 5px 5px 5px 0;
  font-size: 14px;
`
export const FeaturedPropertiesScoreTitle = styled.div`
  margin-left: 8px;
  margin-right: 15px;
  font-size: 14px;
`
export const FeaturedPropertiesReviews = styled.div`
  font-size: 12px;
`
