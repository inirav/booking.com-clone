import styled from 'styled-components'
import { colors } from '../../utils/styles'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`

export const Image = styled.img`
  border-radius: 2px;
  max-width: 1024px;
  user-select: none;
`

export const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 30px;
  margin-right: 30px;
  background-color: #fff;
  line-height: 0;
  padding: 8px;
  border-radius: 100%;
  font-size: 12px;
  cursor: pointer;
`

export const PrevNextIcon = styled.div`
  color: #fff;
  font-size: 26px;
  cursor: pointer;
`
