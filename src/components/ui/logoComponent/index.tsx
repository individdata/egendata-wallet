import React from 'react';
import Image from 'next/image';
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
        <Image
          className={styles.logo}
          alt="bnp logo"
          src="/images/bnp.png"
          width="27"
          height="40"
        />

      </Grid>
    </Grid>
  );
}

export default LogoComponent;
