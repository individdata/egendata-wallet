import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import RedirectLogoutButton from './logoutButton/redirect';
import LogoutButton from './logoutButton';
import { RootState } from '../../store';
import Tabs from './tabs';
import OakLogo from './oakLogo';

function Header(redirect: boolean) {
  console.log(redirect);
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  return (
    <div className={styles.headline}>
      <div className={styles.logo}>
        <OakLogo />
      </div>
      <div className={(redirect === false && isLoggedIn) ? styles.tabs : styles.shownothing}>
        <Tabs />
      </div>
      <div className={(redirect === false && isLoggedIn) ? styles.logout : styles.shownothing}>
        <LogoutButton />
      </div>
      <div className={(redirect && isLoggedIn) ? styles.logout : styles.shownothing}>
        <RedirectLogoutButton />
      </div>
    </div>
  );
}

export default Header;
