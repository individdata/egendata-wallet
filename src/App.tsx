import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import MainComponent from './components/MainComponent/MainComponent';
import LoginComponent from './components/LoginComponent/LoginComponent';
import { State } from './state/reducers';

function App() {
  const loggedin = useSelector((state: State) => state.auth);

  if (loggedin) {
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
