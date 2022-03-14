import React from 'react';
import { useSelector } from 'react-redux';
import styles from './RedirectMainPage.module.css';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import RequestsBox from '../../components/RequestsBox/RequestsBox';
import CertificateBox from '../../components/CertificateBox/CertificateBox';
import OakLogo from '../../components/OakLogo/OakLogo';
import { State } from '../../state/reducers';

function RedirectMainPage() {
  const authState = useSelector((state: State) => state.auth);
  return (
    <div>
      <div className={(authState === 'login') ? styles.headline1 : styles.headline2}>
        <div className={styles.logo}>
          <OakLogo />
        </div>
        <div className={styles.logout}>
          <LogoutButton />
        </div>
      </div>
      <RequestsBox />
      <CertificateBox />
    </div>
  );
}

export default RedirectMainPage;
