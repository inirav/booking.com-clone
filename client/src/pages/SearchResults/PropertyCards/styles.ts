import styled from 'styled-components'
import { colors } from '../../../utils/styles'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 0.75;
`

export const Title = styled.h2``

export const CardContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px;
  border: 1px solid ${colors.borderGray};
  border-radius: 2px;
`

export const CardLeft = styled.div``

export const CardMiddle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

export const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`

export const CardColumn = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const PropertyImage = styled.img`
  min-width: 200px;
  min-height: 200px;
  width: 200px;
  height: 200px;
  border-radius: 2px;
  background-color: ${colors.skeletonBackgound};
`

export const PropertyName = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.primaryLight};
`

export const PropertyAddress = styled.div`
  font-size: 12px;
  color: ${colors.primaryLight};
  font-weight: 600;
  text-decoration: underline;
`

export const PropertyDistance = styled.div`
  font-size: 12px;
`

export const PropertyFreeTaxi = styled.div`
  font-size: 12px;
  background-color: ${colors.success};
  color: ${colors.textWhite};
  padding: 2px 5px;
  width: fit-content;
  border-radius: 2px;
`

export const PropertyHighLights = styled.div`
  font-size: 12px;
`

export const PropertyFreeCancellation = styled.p`
  font-size: 12px;
  color: ${colors.success};
`

export const PropertyScoreTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 3px;
`
export const PropertyScoreText = styled.div`
  font-size: 16px;
  font-weight: 500;
`

export const PropertyScoreSubText = styled.div`
  font-size: 12px;
  color: ${colors.textGray};
`

export const PropertyRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  color: ${colors.textWhite};
  width: 34px;
  height: 34px;
  font-weight: 500;
  border-radius: 5px 5px 5px 0;
  margin-left: 5px;
`

export const PropertyRateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
  margin-top: auto;
  margin-bottom: 5px;
`

export const PropertyRateInfoText = styled.div`
  font-size: 12px;
  color: ${colors.textGray};
`

export const PropertyRate = styled.div`
  font-size: 20px;
  font-weight: 500;
`
