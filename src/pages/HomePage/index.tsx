/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React from 'react';
import { RequestBox } from '../../components/requestBox';
// import { getRequestsContent } from '../../slices/requestsSlice';
import Header from '../../components/header';
import styles from './index.module.css';

function HomePage() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={styles.main} id="landingPage">
          <Header />
          <div className={styles.body}>
            <RequestBox />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default HomePage;
