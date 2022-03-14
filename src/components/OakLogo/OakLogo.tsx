import React from 'react';
import { useSelector } from 'react-redux';
import styles from './OakLogo.module.css';
import { State } from '../../state/reducers';

function OakLogo() {
  const authState = useSelector((state: State) => state.auth);
  return (
    <div className={styles.title}>
      <img className={(authState === 'login') ? styles.logo1 : styles.logo2} alt="logo" />
      Project
      <div className={styles.oak}>OAK</div>
    </div>
  );
}

export default OakLogo;
