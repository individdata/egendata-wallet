import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../popupcard.module.css';
import Card from './card';
import Info from './info';
import { BodyTypes } from '../types';

function Body(props: BodyTypes) {
  const { msg } = props;
  return (
    <Grid className={styles.pText}>
      <Card />
      <Info msg={msg} />
    </Grid>

  );
}

export default Body;
