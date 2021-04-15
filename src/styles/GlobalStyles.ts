import { createGlobalStyle } from 'styled-components'
import colors from './themes/colors'

export const GlobalStyles = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${colors.darkestGray};
    overflow: hidden;
  }

  button {
    cursor: pointer;
    border: 0;
    text-transform: uppercase;
    border-radius: 4px;
    color: ${colors.white};
    font-weight: bold;
    padding: .5em;
  }

  p {
    margin-bottom: 0;
  }
`
