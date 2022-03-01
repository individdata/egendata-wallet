import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { State } from './state/reducers';

function App() {
  const authState = useSelector((state: State) => state.auth);

  if (authState === 'login') {
    return (
      <div className="App">
        <body>
          <MainPage />
        </body>
      </div>
    );
  }
  return (
    <div className="App">
      <body>
        <LoginPage />
      </body>
    </div>
  );
}

export default App;
