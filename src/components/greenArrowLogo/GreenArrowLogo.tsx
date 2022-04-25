import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';
import Arrow from '../../util/Arrow';

function GreenArrowLogo() {
  return (
    <Grid container>
      <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item md={6} className={styles.item}>
          Project
          <div className={styles.oak}>OAK</div>
        </Grid>
      </Grid>

      <Grid
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Arrow />
      </Grid>
    </Grid>
  );
}

export default GreenArrowLogo;
