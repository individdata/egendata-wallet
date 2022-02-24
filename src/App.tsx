import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import MainComponent from './components/MainComponent/MainComponent';
import LoginComponent from './components/LoginComponent/LoginComponent';
import { bindActionCreators } from 'redux';
import { actionCreators } from "./state/index" 

function App() {
  const login = useSelector((state: any) => state.login);
  const dispatch = useDispatch();

  const AC = bindActionCreators(actionCreators, dispatch);

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
        <LoginComponent/>
      </body>
    </div>
  );
}

export default App;
