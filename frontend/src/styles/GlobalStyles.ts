import { createGlobalStyle } from 'styled-components'
import themes from '../themes'

export default createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }
  html, body, #root {
      height: 100%;
      width: 100%;
      background-color: ${themes.light.mercury};
      overflow: hidden;
  }
  *, button, input {
      border: 0;
      outline: 0;

      font-family: 'Roboto', sans-serif;
  }  
`