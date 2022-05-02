import React from 'react';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import HomePage from '../HomePage';
import LoginImage from '../../components/loginImage';
import { RootState } from '../../store';

function AuthPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  return (

    <Grid container spacing={3} className="App" sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      {!isLoggedIn ? (
        <>
          <Grid className={styles.left} item xs={12} md={6}>
            <LoginImage />
          </Grid>
          <Grid xs={12} md={6} item>
            <HomePage />
          </Grid>
        </>
      ) : (
        <Grid xs={12} md={12} item>
          <HomePage />
        </Grid>
      ) }
    </Grid>
  );
}

export default AuthPage;
