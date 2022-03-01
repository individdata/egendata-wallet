import React from 'react';
import styles from './LoginPage.module.css';
import LoginImage from '../../components/LoginImage/LoginImage';
import MainPage from '../MainPage/MainPage';

function LoginPage() {
  return (
    <div className={styles.main}>
      <LoginImage />
      <MainPage />
    </div>
  );
}

export default LoginPage;
