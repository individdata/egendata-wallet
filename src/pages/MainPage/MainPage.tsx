import React from 'react';
import { useSelector } from 'react-redux';
import styles from './MainPage.module.css';
import LoginButton from '../../components/LoginButton/LoginButton';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import Tabs from '../../components/Tabs/Tabs';
import RequestsBox from '../../components/RequestsBox/RequestsBox';
// import CertificateBox from '../../components/CertificateBox/CertificateBox';
import { State } from '../../state/reducers';
import VerifiyEmailBox from '../../components/VerifyEmailBox/VerifiyEmailBox';

function MainPage() {
  const authState = useSelector((state: State) => state.auth);

  return (
    <div className={styles.main}>
      <div className={styles.headline}>
        <div className={styles.title} style={{ display: 'flex' }}>
          <img className={(authState === 'login') ? styles.logo1 : styles.logo2} alt="logo" />
          Project
          <div className={styles.oak}>OAK</div>
        </div>
        <div className={styles.tabs}>
          <Tabs />
        </div>
        <div className={styles.logout}>
          <LogoutButton />
        </div>
      </div>
      <LoginButton />
      <RequestsBox />
      <VerifiyEmailBox />
      {/* <CertificateBox /> */}
    </div>
  );
}

export default MainPage;
