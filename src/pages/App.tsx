import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import RequestPage from './RequestPage';
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import { HandleLogin } from './auth/HandleLogin';
import * as config from '../util/config';
import Popup from '../components/popup/Popup';
import { RootState } from '../store';
import { setPopupData } from '../slices/popup2Slice';

console.log('Launching app with config: ', config);

function App() {
  const dispatch = useDispatch();
  const popup = useSelector((state: RootState) => state.popup2);

  useEffect(() => {
    dispatch(setPopupData({
      component: 'FetchDetailPreview',
      props: {
        requestId: uuid(),
      },
    }));
  }, []);

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
