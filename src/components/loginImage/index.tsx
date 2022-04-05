import React from 'react';
import Grid from '@mui/material/Grid';
import LoginImageText from '../loginImageText/index';
import LoginImageLogo from '../loginImageLogo';
import styles from './index.module.css';

function LoginImage() {
  return (
    <Grid container spacing={3} className={styles.main}>
      <LoginImageLogo />
      <LoginImageText />
    </Grid>

  );
}

export default LoginImage;
