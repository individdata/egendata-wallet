import { Grid } from '@mui/material';
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
    <Grid container className={styles.headline}>
      <Grid className={(!redirect && !isLoggedIn) ? styles.logo1 : styles.logo2}>
        <OakLogo />
      </Grid>
      {!redirect && isLoggedIn && (
        <Grid className={styles.tabsContiner}>
          <Tabs />
        </Grid>
      )}
      <Grid className={(isLoggedIn) ? styles.langContiner1 : styles.langContiner2}>
        <LangButton />
      </Grid>
      {!redirect && isLoggedIn && (
        <Grid className={styles.logoutContiner}>
          <LogoutButton />
        </Grid>
      )}
      {redirect && isLoggedIn && (
        <Grid className={styles.logoutContiner}>
          <RedirectLogoutButton />
        </Grid>
      )}
    </Grid>
  );
}

export default Header;
