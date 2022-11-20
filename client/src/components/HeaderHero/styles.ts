import styled from 'styled-components'
import { colors, sizes } from '../../utils/styles'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${colors.primary};
  color: ${colors.textWhite};
  margin-top: 50px;
  padding-bottom: 80px;
  max-width: ${sizes.screenMaxWidth}px;
  margin-left: auto;
  margin-right: auto;
`

export const Text = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 5px;
`

export const SubText = styled.p`
  font-size: 22px;
`
