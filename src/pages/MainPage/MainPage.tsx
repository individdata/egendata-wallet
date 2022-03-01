import React from 'react';
import styles from './MainPage.module.css';
import LoginButton from '../../components/LoginButton/LoginButton';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import Tabs from '../../components/Tabs/Tabs';
import RequestsBox from '../../components/RequestsBox/RequestsBox';

function MainPage() {
  return (
    <div className={styles.main}>
      <div className={styles.title} style={{ display: 'flex' }}>
        <img className={styles.logo} alt="logo" />
        Project
        <div className={styles.oak}>OAK</div>
      </div>
      <LogoutButton />
      <Tabs />
      <LoginButton />
      <RequestsBox />
    </div>
  );
}

export default MainPage;
