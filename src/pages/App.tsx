import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { useSelector } from 'react-redux';
import RequestPage from './RequestPage';
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import { HandleLogin } from './auth/HandleLogin';
import * as config from '../util/config';
import Popup from '../components/popup/Popup';
import { RootState } from '../store';

console.log('Launching app with config: ', config);

function App() {
  const popup = useSelector((state: RootState) => state.popup);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/request/:id" element={<RequestPage />} />
        <Route path="/auth/cb" element={<HandleLogin />} />
      </Routes>
      { popup.popupData && <Popup /> }
    </div>
  );
}

export default App;
