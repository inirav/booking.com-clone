import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
`

export const StyledModal = styled.div`
  background-color: #fff;
  padding: 30px;
  border: 1px solid lightgray;
  border-radius: 8px;
  max-height: calc(100vh - 100px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 99px;
    background: #dfe0eb;
  }
`

export const Title = styled.h2`
  margin-bottom: 25px;
`
