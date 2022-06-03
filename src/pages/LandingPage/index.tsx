/* eslint-disable */
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { Buffer } from 'buffer';
import { v4 as uuid } from 'uuid';
import { RootState } from '../../store';
import styles from './index.module.css';
import Button from '../../components/ui/Button';
import { doLogin } from '../../slices/authSlice';
import { saveIncomingRequest } from '../../slices/processesSlice';
import { storeInboundDataRequest } from '../../slices/requestsSlice';
import { redirectUpdate } from '../../slices/redirectSlice';
import Header from '../../components/header';
import { Footer, Title, LandingTextBox } from './utils';
import FlowBox from '../../components/flowBox';
import AuthPage from '../AuthPage';

function LandingPage() {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState<boolean | string>(false);

  const url = new URL(window.location.href);
  const currentPath = url.pathname + url.search;
  const request = url.searchParams.get('request') ?? '';

  const user = useSelector((state: RootState) => state.auth.user);
  console.log('user = ', user);
  const isLoggedIn = Object.keys(user).length !== 0;
  console.log('isLoggedIn = ', isLoggedIn);

  const doRedirect= useSelector((state: RootState) => state.redirect.status);

  useEffect(() => {
    if (request) {
      dispatch(redirectUpdate());
    }
  });

  useEffect(() => {
    console.log('############ request = ', request);
    if (isLoggedIn && !doRedirect) {
      setRedirect('/home');
    }

    if (isLoggedIn && doRedirect) {
      const decodedRequest = JSON.parse(Buffer.from(decodeURIComponent(request), 'base64').toString('utf8'));
      decodedRequest.id = uuid();
      if (decodedRequest) {
        dispatch(saveIncomingRequest(decodedRequest));
        setRedirect(`/request/${decodedRequest.id}`);
      } else {
        console.warn('Decoded request is somehow empty?');
      }
    }
  }, [isLoggedIn, doRedirect]);

  if (redirect && typeof (redirect) === 'string') {
    return <Navigate to={redirect} replace />;
  }
  if (request) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <div className={styles.main}>
            <Header />
            <div className={styles.body}>
              <div className={styles.title}>
                <Title />
              </div>
              <div className={styles.flowBox}>
                <FlowBox />
              </div>
              <div className={styles.text}>
                <LandingTextBox />
              </div>
              <Button type="primary" onPress={() => dispatch(doLogin(currentPath))} id="login_button" />
            </div>
            <div className={styles.footer}>
              <Footer />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }

  return <AuthPage />;
}

export default LandingPage;
