import Grid from '@mui/material/Grid';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import styles from './index.module.css';

function RedirectLogoutButton() {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={styles.items}>
          <img className={styles.logo} alt="logo" />
          <div className={styles.logotext}>
            {user?.name}
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default RedirectLogoutButton;
