import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';

function LoginImageText() {
  return (
    <Grid container>
      <Grid className={styles.header} item xs={12} sx={{ marginBottom: '29px' }}>
        <Grid sx={{ maxWidth: '340px' }}>
          <p className={styles.first}>
            jakob wallet
          </p>
        </Grid>
      </Grid>
      <Grid
        className={styles.container}
        container
        spacing={3}
      >
        <Grid item xs={12} className={styles.center}>
          <p>
            Project Oak is a governmental service
          </p>
        </Grid>
        <Grid item xs={12} className={styles.center}>
          <p>Oak is a governmental service</p>
        </Grid>
        <Grid item xs={12} className={styles.center}>
          <p>that allows you to store and transfer</p>
        </Grid>
        <Grid item xs={12} className={styles.center}>
          <p>digital information between public and</p>
        </Grid>
        <Grid item xs={12} className={styles.center}>
          <p>private organtisations.</p>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoginImageText;
