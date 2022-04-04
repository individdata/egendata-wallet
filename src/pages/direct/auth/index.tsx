import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import styles from './index.module.css';
import HomePage from '../home';
import LoginImage from '../../../components/loginImage';

function AuthPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  return (
    <div className={styles.main}>
      <div className={(isLoggedIn) ? styles.left1 : styles.left2}>
        <LoginImage />
      </div>
      <div className={(isLoggedIn) ? styles.right1 : styles.right2}>
        <HomePage />
      </div>
    </div>
  );
}

export default AuthPage;
