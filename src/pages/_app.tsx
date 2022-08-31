import React from 'react';
import '../styles/globals.css'
import { Provider, useSelector } from 'react-redux'
import { RootState, store } from "../store/store";
import { IntlProvider } from "react-intl";
import LOCALES from '../react-intl/locales';
import { SessionProvider } from 'next-auth/react';

import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>   
    </SessionProvider>
  )
}

export default App
