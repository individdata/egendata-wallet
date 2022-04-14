import React from 'react';
import Grid from '@mui/material/Grid';

import { useSelector } from 'react-redux';
import styles from './index.module.css';
import { RootState } from '../../store';

function OakLogo() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  return (

    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid
        item
        md={6}
        className={styles.item}
      >
        <img className={(isLoggedIn) ? styles.logo1 : styles.logo2} alt="logo" />
        Project
        <div className={styles.oak}>OAK</div>
      </Grid>
    </Grid>

  );
}

export default OakLogo;
