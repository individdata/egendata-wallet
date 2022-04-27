/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { Buffer } from 'buffer';
import { v4 as uuid } from 'uuid';
import { RootState } from '../../store';
import styles from './index.module.css';
import Button from '../../components/ui/Button';
import { doLogin } from '../auth/login';
import { storeInboundDataRequest } from '../requests/requestSlice';
import Header from '../../components/header';
import FlowBox from '../../components/flowBox';

function LandingPage() {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState<boolean | string>(false);

  const url = new URL(window.location.href);
  const currentPath = url.pathname + url.search;
  const request = url.searchParams.get('request');

  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;

  useEffect(() => {
    if (isLoggedIn && !request) {
      setRedirect('/home');
    }

    if (isLoggedIn && request) {
      const decodedRequest = JSON.parse(Buffer.from(decodeURIComponent(request), 'base64').toString('utf8'));
      decodedRequest.id = uuid();
      dispatch(storeInboundDataRequest(decodedRequest));
      setRedirect(`/request/${decodedRequest.id}`);
    }
  }, []);

  if (redirect && typeof (redirect) === 'string') {
    return <Navigate to={redirect} replace />;
  }
  const redirectState = false;
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={styles.main}>
          <Header {...redirectState} />
          <div className={styles.body}>
            <div className={styles.flowBox}>
              <FlowBox />
            </div>
            <Button onPress={() => dispatch(doLogin(currentPath))} label="Login" />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
