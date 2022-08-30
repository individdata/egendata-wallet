import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider, useSelector } from 'react-redux'
import { RootState, store } from "../store/store";
import { IntlProvider } from "react-intl";
import LOCALES from '../react-intl/locales';
import { AuthProvider } from '../context/AuthProvider';

function App({ Component, pageProps }: AppProps) {
  

  return <Provider store={store}>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </Provider> 
  
  
}

export default App
