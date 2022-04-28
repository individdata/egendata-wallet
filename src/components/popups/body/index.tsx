import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';
import Card from './card';
import Info from './info';
import { BodyTypes } from '../types';

function Body(props: BodyTypes) {
  const { msg } = props;
  return (
    <div className={styles.body}>
      <div className={styles.items}>
        <Grid className={styles.pText}>
          <Card />
          <Info msg={msg} />
        </Grid>
      </div>
    </div>
  );
}

export default Body;
