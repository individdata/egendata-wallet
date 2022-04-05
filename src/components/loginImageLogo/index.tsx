import { Grid } from '@mui/material';
import React from 'react';
import styles from './index.module.css';

function LoginImageLogo() {
  return (
    <Grid
      container
      spacing={3}
      className={styles.titleHead}
      sx={{ minWidth: '30px' }}
    >
      <Grid
        item
        md={12}
        className={styles.titleHead}
      >
        <div className={styles.leaf}>
          <img className={styles.logo} alt="left-logo" />
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginImageLogo;
