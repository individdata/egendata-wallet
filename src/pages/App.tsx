import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import RequestPage from './RequestPage';
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import { HandleLogin } from './AuthPage/HandleLogin';
import * as config from '../util/config';
import Popup from '../components/popup/Popup';
import { LOCALES } from '../react-intl/locales';
import { RootState } from '../store';
import { TestPage } from './TestPage';

console.log('Launching app with config: ', config);

function App() {
  const popup = useSelector((state: RootState) => state.popup);
  const lang = useSelector((state: RootState) => state.lang.lang);

  return (
    <IntlProvider locale={lang} messages={LOCALES[lang]}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/request/:id" element={<RequestPage />} />
        <Route path="/auth/cb" element={<HandleLogin />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
      { popup.popupData && <Popup /> }
    </IntlProvider>
  );
}

export default App;
