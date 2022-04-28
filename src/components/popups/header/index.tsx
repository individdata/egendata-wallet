import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../popupcard.module.css';
import { style4 } from '../styles';

function Header() {
  return (
    <>
      <Grid
        className={styles.center}
        sx={style4.pad10}
      >
        <Grid md={12} className={styles.textHeader}>
          Review your document data
        </Grid>
      </Grid>
      <Grid
        className={styles.center}
        sx={style4.pad20}
      >
        <Grid md={12} className={styles.pText}>
          You are about to share your Unemployment certificate to BNP Paribas.
        </Grid>
      </Grid>
    </>
  );
}

export default Header;
