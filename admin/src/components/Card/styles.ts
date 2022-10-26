import styled from 'styled-components'

export const Title = styled.div`
  font-size: 19px;
  font-weight: bold;
  color: #9fa2b4;
`

export const Count = styled.div`
  font-size: 40px;
  font-weight: bold;
`

export const Container = styled.div`
  background-color: #fff;
  border: 1px solid #dfe0eb;
  border-radius: 8px;
  width: 100%;
  padding: 25px;

  &:hover {
    border-color: #3751ff;

    ${Title}, ${Count} {
      color: #3751ff;
    }
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`