import styled from 'styled-components'
import { colors, sizes } from '../../utils/styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
`

export const PropertyNameAddress = styled.div``

export const PropertyName = styled.h2`
  margin-bottom: 7px;
`

export const PropertyAddress = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`

export const PropertyAddressText = styled.div`
  font-size: 14px;
`

export const PropertyImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

export const PropertyImage = styled.img`
  width: 334px;
  border-radius: 2px;
  cursor: pointer;
`

export const PropertyImageMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 334px;
  font-size: 18px;
  font-weight: 600;
  background-color: ${colors.skeletonBackgound};
  border-radius: 2px;
  cursor: pointer;
`

export const PropertyDescHighlights = styled.div`
  display: flex;
  gap: 50px;
`

export const PropertyDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 0.8;
  font-size: 14px;
`

export const PropertyHighlights = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex: 0.3;
  background-color: ${colors.primaryLightest};
  padding: 15px;
  border-radius: 2px;
  font-size: 13px;
  height: fit-content;
`

export const PropertyHighlightsTitle = styled.h3`
  font-size: 16px;
`

export const PropertyHighlightsSubTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
`

export const PropertyHighlightsItem = styled.div`
  display: flex;
  gap: 10px;
`

export const PropertyHighlightsText = styled.p``

export const PropertyHighlightsRate = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: bold;
`

export const PropertyHighlightsRateText = styled.div`
  font-size: 14px;
  font-weight: normal;
`

export const PropertyHighlightsFooter = styled.div`
  display: flex;
  margin-top: 15px;
`
