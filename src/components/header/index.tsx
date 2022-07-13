import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import RedirectLogoutButton from './logoutButton/redirect';
import useWindowDimensions from '../../hooks/useWindowDimension';
import LogoutButton from './logoutButton';
import MenuButton from './menuDropdownButton';
import { RootState } from '../../store';
import Tabs from './tabs';
import OakLogo from './oakLogo';
import LangButton from './langButton';

function Header() {
  const redirect = useSelector((state: RootState) => state.redirect.status);
  const user = useSelector((state: RootState) => state.auth.user);
  const { width } = useWindowDimensions();
  const isLoggedIn = user?.completed;
  if (width < 576) {
    return (
      <div className={styles.headline}>
        <div className={(!redirect && !isLoggedIn) ? styles.logo1 : styles.logo2}>
          <OakLogo />
        </div>
        <div className={styles.menuContiner}>
          <MenuButton />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.headline}>
      <div className={(!redirect && !isLoggedIn) ? styles.logo1 : styles.logo2}>
        <OakLogo />
      </div>
      {!redirect && isLoggedIn && (
        <div className={styles.tabsContiner}>
          <Tabs />
        </div>
      )}
      <div className={(isLoggedIn) ? styles.langContiner1 : styles.langContiner2}>
        <LangButton />
      </div>
      {!redirect && isLoggedIn && (
        <div className={styles.logoutContiner}>
          <LogoutButton />
        </div>
      )}
      {redirect && isLoggedIn && (
        <div className={styles.logoutContiner}>
          <RedirectLogoutButton />
        </div>
      )}
    </div>
  );
}

export default Header;
