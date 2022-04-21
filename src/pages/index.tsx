import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthPage from './auth';
import { HandleLogin } from './auth/HandleLogin';
import { RedirectPage } from './redirect';

function RoutePages() {
  // if (redirect) {
  //   return <RedirectLoginPage redirect={redirect} />;
  // }
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/auth/*" element={<HandleLogin />} />
      <Route path="/request" element={<RedirectPage />} />
    </Routes>
  );
}

export default RoutePages;
