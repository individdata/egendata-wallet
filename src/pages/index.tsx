import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './auth';
import { HandleLogin } from './auth/HandleLogin';
import { HandleRequest } from './redirect/Request';

function RoutePages() {
  // if (redirect) {
  //   return <RedirectLoginPage redirect={redirect} />;
  // }
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/auth/*" element={<HandleLogin />} />
      <Route path="/request" element={<HandleRequest />} />
    </Routes>
  );
}

export default RoutePages;
