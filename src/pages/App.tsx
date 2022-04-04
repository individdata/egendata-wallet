import React from 'react';
import './App.css';
import DirectPage from './direct';
// import RedirectLoginPage from './RedirectPage/RedirectLoginPage/RedirectLoginPage';
// import { redirect } from './setupParameters';

function App() {
  // if (redirect) {
  //   return <RedirectLoginPage redirect={redirect} />;
  // }
  return <DirectPage />;
}

export default App;
