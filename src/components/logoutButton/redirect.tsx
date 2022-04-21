import Grid from '@mui/material/Grid';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './index.module.css';

function LogoutButton() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  return (
    <div className={(!isLoggedIn) ? styles.logoutavailable1 : styles.logoutavailable2}>
      <Grid container className={styles.logocontainer}>
        <Grid item>
          <div className={styles.items}>
            <img className={styles.logo} alt="logo" />
            <div className={styles.logotext}>
              {user?.name}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>

  );
}

export default LogoutButton;
