import styled from "styled-components"

export const Container = styled.div`
  background-color: #363740;
  color: #a4a6b3;
  width: 255px;
  height: 100vh;

  hr {
    border: none;
    height: 0.1px;
    background-color: rgba(223, 224, 235, 0.06);
    margin: 0;
  }
`

export const Brand = styled.div`
  padding: 40px 0;
  font-size: 19px;
  font-weight: 700;
  text-align: center;
  margin: 0;
`

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`
export const ListItem = styled.li`
  a {
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 16px;
    padding: 18px;
    padding-left: 24px;
    border-left: 3px solid transparent;
    cursor: pointer;
    color: #a4a6b3;
    text-decoration: none;

    .icon {
      color: rgba(159, 162, 180, 0.4);
    }

    &.active,
    &:hover {
      background-color: #9fa2b414;
      color: #dde2ff;

      .icon {
        color: #dde2ff;
      }
    }

    &.active {
      border-color: #dde2ff;
    }
  }
`