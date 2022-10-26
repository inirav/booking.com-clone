import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px;
`

export const Title = styled.h2`
  margin: 0;
  font-size: 24px;
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;

  .name {
    font-size: 14px;
    font-weight: 600;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 1px solid #c4c4c4;
    padding: 3px;
    cursor: pointer;
  }
`

export const Dropdown = styled.ul`
  list-style: none;
  padding: 0;
  position: absolute;
  bottom: -55px;
  right: 0;
  background-color: #fff;
  border: 1px solid #dfe0eb;
  border-radius: 8px;

  -webkit-box-shadow: 10px 7px 10px 0px rgba(0, 0, 0, 0.09);
  -moz-box-shadow: 10px 7px 10px 0px rgba(0, 0, 0, 0.09);
  box-shadow: 10px 7px 10px 0px rgba(0, 0, 0, 0.09);

  li {
    a {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #000;
      padding: 10px 20px;
    }
  }
`
