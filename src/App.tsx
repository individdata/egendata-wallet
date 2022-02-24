import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import MainComponent from './components/MainComponent/MainComponent';
import LoginComponent from './components/LoginComponent/LoginComponent';

function App() {
  const login = useSelector((state: any) => state.login);

  if (login) {
    return (
      <div className="App">
        <body>
          <MainComponent />
        </body>
      </div>
    );
  }
  return (
    <div className="App">
      <body>
        <LoginComponent />
      </body>
    </div>
  );
}

export default App;
