import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components';
import { wrapper } from '../store';
import Script from 'next/script'

import theme from '../themes'

import GlobalStyles from '../styles/GlobalStyles'

import * as UserActions from '../store/ducks/user/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function App({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.userReducer.user)
  

  return(  
    <>
        <GlobalStyles />
          <ThemeProvider theme={theme.light}>
            <Component {...pageProps} />          
          </ThemeProvider>

    </>              
  )
}

export default wrapper.withRedux(App)
