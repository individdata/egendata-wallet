import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import LoginButton from '../../../components/loginButton';
import LogoutButton from '../../../components/logoutButton';
import { RootState } from '../../../store';
import Tabs from '../../../components/tabs';

import OakLogo from '../../../components/oakLogo';
import RequestsBox from '../../../components/requestBox';
// import VerifiyEmailBox from '../../../components/VerifyEmailBox/VerifiyEmailBox';

function HomePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  return (
    <Grid
      container
      sx={{
        marginTop: '15px',
      }}
    >
      <Grid xs={12} md={4} className={styles.paddingItem2}>
        <OakLogo />
      </Grid>
      <Grid
        xs={12}
        md={4}
        className={!isLoggedIn ? styles.paddingItem : styles.paddingItem2}
      >
        <Tabs />
      </Grid>
      <Grid
        xs={12}
        md={4}
        className={!isLoggedIn ? styles.paddingItem : styles.paddingItem2}
      >
        <LogoutButton />
      </Grid>
      <Grid xs={12}>
        <LoginButton />
      </Grid>
      <Grid xs={12}>
        <RequestsBox />
      </Grid>
      <Grid xs={12}>{/* <CertificateBox /> */}</Grid>
    </Grid>
  );
}

export default HomePage;
