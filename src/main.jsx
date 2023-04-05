import React from 'react'
import ReactDOM from 'react-dom/client'
import { createGlobalStyle } from 'styled-components'
import App from './App'
import './assets/index.css'

const GlobalStyledComponent = createGlobalStyle`
body{
  margin:0;
}

  *{
    font-size: 62.5%;
    font-family: "noto_sans";
  }

 


`

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyledComponent />
    <App />
  </React.StrictMode>,
)
