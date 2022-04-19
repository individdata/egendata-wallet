import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import LoginButton from '../../../components/loginButton';
import LogoutButton from '../../../components/logoutButton';
import { RootState } from '../../../store';
import Tabs from '../../../components/tabs';

import OakLogo from '../../../components/oakLogo';
import Inbox from '../../../components/requestBox';
// import VerifiyEmailBox from '../../../components/VerifyEmailBox/VerifiyEmailBox';

function HomePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
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
      <div className={(isLoggedIn) ? styles.loginpage2 : styles.loginpage1}>
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
      <Inbox />
      {/* <CertificateBox /> */}
    </div>
  );
}

export default HomePage;
