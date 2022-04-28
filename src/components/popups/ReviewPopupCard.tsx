import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './popupcard.module.css';
import Header from './header';
import Body from './body';
import { PropTypes } from './types';

function ReviewPopupCard(props: PropTypes) {
  const { msg } = props;
  return (

    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Header />
        <Grid className={styles.pText}>
          <Body msg={msg} />
        </Grid>
      </Grid>
    </Grid>

  );
}

export default ReviewPopupCard;
