import { createGlobalStyle } from 'styled-components'
import { colors } from './utils/styles'

export default createGlobalStyle`
  body {
    color: ${colors.textDarkest};
    font-family: 'Open Sans', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  ul, li, ol, h1, h2, h3, h4, h5, h6, p {
    padding: 0;
    margin: 0;
  }

  button {
    background: none;
    border: none;
    outline: none;
  }
`
