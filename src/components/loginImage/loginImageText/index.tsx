import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';

function LoginImageText() {
  return (
    <Grid container>
      <Grid className={styles.header} item xs={12}>
        <Grid sx={{ maxWidth: '340px' }}>
          <p className={styles.first}>Your data in your control</p>
        </Grid>
      </Grid>
      <Grid item xs={12} className={styles.textContainer}>
        <p>
          Project Oak is a governmental initiative that allows you to store and transfer digital information between public and private organizations.
        </p>
      </Grid>
    </Grid>
  );
}

export default LoginImageText;
