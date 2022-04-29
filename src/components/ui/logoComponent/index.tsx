import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';

function LogoComponent() {
  return (
    <Grid
      container
    >
      <Grid
        item
        xs={12}
        sx={{
          paddingBottom: '10px',
        }}
      >
        <img
          className={styles.logo}
          alt="bnp logo"
        />

      </Grid>
    </Grid>
  );
}

export default LogoComponent;
