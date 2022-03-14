import React from 'react';
import { useSelector } from 'react-redux';
import styles from './DirectLoginPage.module.css';
import LoginImage from '../../components/LoginImage/LoginImage';
import DirectMainPage from '../DirectMainPage/DirectMainPage';
import { State } from '../../state/reducers';

function LoginPage() {
  const authState = useSelector((state: State) => state.auth);
  if (authState === 'login') {
    return (
      <div className="App">
        <DirectMainPage />
      </div>
    );
  }
  return (
    <div className="App">
      <div className={styles.main}>
        <LoginImage />
        <DirectMainPage />
      </div>
    </div>
  );
}

export default LoginPage;
