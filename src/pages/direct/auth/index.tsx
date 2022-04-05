import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';
import HomePage from '../home';
import LoginImage from '../../../components/loginImage';

function AuthPage() {
  return (

    <Grid container spacing={3} className="App" sx={{ display: 'flex', flexDirection: 'row' }}>
      <Grid className={styles.left} item xs={12} md={6}>
        <LoginImage />
      </Grid>
      <Grid xs={12} md={6}>
        <HomePage />
      </Grid>
    </Grid>
  );
}

export default AuthPage;
