import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { SessionProvider } from 'next-auth/react';
import { Provider, useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import theme from '../theme'; // TODO: Update as appropriate.
import createEmotionCache from '../lib/createEmotionCache';
import { RootState, store } from '../store/store';
import LOCALES from '../locales';
import { Session } from 'next-auth';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  pageProps: {
    session: Session;
  };
}

interface CustomIntlProviderProps {
  children: React.ReactNode;
}

function CustomIntlProvider({ children }: CustomIntlProviderProps) {
  const lang = useSelector((state: RootState) => state.lang.lang);

  return (
    <IntlProvider locale={lang} messages={LOCALES[lang]}>
      {children}
    </IntlProvider>
  );
}

function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Provider store={store}>
        <CustomIntlProvider>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta name="viewport" content="initial-scale=1 width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        </CustomIntlProvider>
      </Provider>
    </SessionProvider>
  );
}

export default App;
