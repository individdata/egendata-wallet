import React from 'react';
import { useSelector } from 'react-redux';
import styles from './DirectMainPage.module.css';
import LoginButton from '../../components/LoginButton/LoginButton';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import Tabs from '../../components/Tabs/Tabs';
import RequestsBox from '../../components/RequestsBox/RequestsBox';
import OakLogo from '../../components/OakLogo/OakLogo';
import { State } from '../../state/reducers';
import VerifiyEmailBox from '../../components/VerifyEmailBox/VerifiyEmailBox';

function MainPage() {
  const authState = useSelector((state: State) => state.auth);
  return (
    <div className={styles.main}>
      <div className={styles.headline}>
        <div className={styles.logo}>
          <OakLogo />
        </div>
        <div className={styles.tabs}>
          <Tabs />
        </div>
        <div className={styles.logout}>
          <LogoutButton />
        </div>
      </div>
      <div className={(authState === 'logout') ? styles.loginpage1 : styles.loginpage2}>
        <div className={styles.firstline}>
          <p className={styles.login}>Log in</p>
        </div>
        <div className={styles.secondline}>
          <LoginButton />
        </div>
        <div className={styles.thirdline}>
          <a href="http://w3schools.com" className={styles.how}>How do I log in with Freja eID?</a>
        </div>
      </div>
      <RequestsBox />
      <VerifiyEmailBox />
      {/* <CertificateBox /> */}
    </div>
  );
}

export default MainPage;
