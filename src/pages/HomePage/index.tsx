/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RequestBox } from '../../components/requestBox';
import { getRequestsContent } from '../requests/requestSlice';
import { doLogin } from '../../util/oak/login';
import Button from '../../components/ui/Button';
import Header from '../../components/header';
import styles from './index.module.css';
import { LogInText, InfoLink } from './utils';

function HomePage() {
  const dispatch = useDispatch();
  const url = new URL(window.location.href);
  const currentPath = url.pathname + url.search;
  useEffect(() => {
    dispatch(getRequestsContent());
  });

  const redirectState = false;
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={styles.main}>
          <Header redirect={redirectState} />
          <div className={styles.loginpage}>
            <LogInText />
            <Button onPress={() => dispatch(doLogin(currentPath))} label="Login" />
            <InfoLink />
          </div>
          <div className={styles.body}>
            <RequestBox />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default HomePage;
