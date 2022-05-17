import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import RedirectLogoutButton from './logoutButton/redirect';
import LogoutButton from './logoutButton';
import { RootState } from '../../store';
import Tabs from './tabs';
import OakLogo from './oakLogo';
import LangButton from './langButton';
import { HeaderType } from './types';

function Header(props: HeaderType) {
  const { redirect } = props;
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  return (
    <div className={styles.headline}>
      <div className={styles.logo}>
        <OakLogo />
      </div>
      {!redirect && isLoggedIn && (
        <div className={styles.tabs}>
          <Tabs />
        </div>
      )}
      <div className={styles.langButton}>
        <LangButton />
      </div>
      {!redirect && isLoggedIn && (
        <div className={styles.logout}>
          <LogoutButton />
        </div>
      )}
      {redirect && isLoggedIn && (
        <div className={styles.logout}>
          <RedirectLogoutButton />
        </div>
      )}
    </div>
  );
}

export default Header;
