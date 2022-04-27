/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RequestBox } from '../../components/requestBox';
import { getRequestsContent } from '../requests/requestSlice';
import Header from '../../components/header';
import styles from './index.module.css';

function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRequestsContent());
  });

  const redirectState = false;
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={styles.main}>
          <Header {...redirectState} />
          <div className={styles.body}>
            <RequestBox />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default HomePage;
