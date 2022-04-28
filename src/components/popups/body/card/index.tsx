import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../../popupcard.module.css';
import { Title, Items } from './utils';

function card() {
  return (
    <Grid className={styles.stickyScroll}>
      <Title title=" Unmployment certificate" />
      <Items name="Employment status:" status="XXXX" />
      <Items name="Employment status start date:" status="XXXX" />
      <Items name="Employment certificate request date:" status="XXXX" />
    </Grid>
  );
}

export default card;
