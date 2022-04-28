import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../popupcard.module.css';
import Card from './card';
import Info from './info';

export interface PropTypes {
  msg: string;
}

function Body(props: PropTypes) {
  // const { msg } = props;
  console.log(props);
  return (
    <Grid container className={styles.scroll}>
      <Card />
      <Info msg="hi from jakob" />
    </Grid>
  );
}

export default Body;
