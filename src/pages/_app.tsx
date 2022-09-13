import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseLine from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../theme';
import createEmotionCache from '../lib/createEmotionCache';

import '../styles/globals.css'
import { Provider, useSelector } from 'react-redux'
import { RootState, store } from "../store/store";
import { IntlProvider } from "react-intl";
import LOCALES from '../react-intl/locales';
import { SessionProvider } from 'next-auth/react';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, with=device-width" />
      </Head>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseLine />
            <Component {...pageProps} />
          </ThemeProvider>
        </Provider>   
      </SessionProvider>
    </CacheProvider>
  )
}

export default App
