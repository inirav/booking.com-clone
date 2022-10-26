import styled from 'styled-components'

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isFocused) {
    return '#4162FE'
  }
  return '#DFE0EB'
}

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`

export const ThumbsContainer = styled.div`
  display: 'flex';
  flex-wrap: 'wrap';
  margin-top: 10px;
`

export const Thumb = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 80px;
  height: 80px;
  padding: 4px;
  box-sizing: border-box;
  position: relative;

  .icon {
    position: absolute;
    top: -7px;
    right: -7px;
    background-color: #dfe0eb;
    padding: 2px;
    font-size: 14px;
    border-radius: 100%;
    cursor: pointer;
  }
`
export const ThumbInner = styled.div`
  display: flex;
  min-width: 0px;
  overflow: hidden;
`

export const Img = styled.img`
  display: block;
  width: auto;
  height: 100%;
`

export const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50%;
`
