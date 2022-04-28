import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../popupcard.module.css';

function Button() {
  return (
    <Grid container>
      <Grid xs={12}>
        <button className={styles.button} type="button">
          <Grid className={styles.buttontext}>Next</Grid>
        </button>
      </Grid>
    </Grid>

  );
}

export default Button;
