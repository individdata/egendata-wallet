import React from 'react';
import './App.css';
import DirectLoginPage from './pages/DirectLoginPage/DirectLoginPage';
import RedirectLoginPage from './pages/RedirectLoginPage/RedirectLoginPage';
import { redirect } from './setupParameters';

function App() {
  if (redirect) {
    return <RedirectLoginPage redirect={redirect} />;
  }
  return <DirectLoginPage />;
}
export default App;
