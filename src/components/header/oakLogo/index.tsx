import React from 'react';

import { useSelector } from 'react-redux';
import styles from './index.module.css';
import { RootState } from '../../../store';

function OakLogo() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  return (
    <div className={styles.title}>
      <img className={isLoggedIn ? styles.logo1 : styles.logo2} alt="logo" />
      Project
      <div className={styles.oak}>OAK</div>
    </div>
  );
}

export default OakLogo;
