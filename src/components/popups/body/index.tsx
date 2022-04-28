import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../popupcard.module.css';
import Card from './card';
import Info from './info';

export interface PropTypes {
  msg: string;
}

function Body(props: PropTypes) {
  const { msg } = props;

  return (
    <Grid className={styles.pText}>
      <Card />
      <Info msg={msg} />
    </Grid>

  );
}

export default Body;
