import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import RequestPage from './RequestPage';
import HomePage from './HomePage';
import LandingPage from './LandingPage';
import { HandleLogin } from './auth/HandleLogin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/request/:id" element={<RequestPage />} />
      <Route path="/auth/cb" element={<HandleLogin />} />
    </Routes>
  );
}

export default App;
