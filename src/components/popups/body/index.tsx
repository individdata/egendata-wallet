import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';
import Card from './card';
import Info from './info';

function Body() {
  return (
    <div className={styles.body}>
      <div className={styles.items}>
        <Grid className={styles.pText}>
          <Card />
          <Info />
        </Grid>
      </div>
    </div>
  );
}

export default Body;
