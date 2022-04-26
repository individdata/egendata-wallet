import { Grid } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { RootState } from '../../store';
import styles from './index.module.css';
import Button from '../../components/ui/Button';
import { doLogin } from '../auth/login';

function LandingPage() {
  const dispatch = useDispatch();

  const url = new URL(window.location.href);
  const currentPath = url.pathname + url.search;
  const request = url.searchParams.get('request');

  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;

  if (isLoggedIn && !request) {
    return <Navigate to="/home" replace />;
  }

  if (isLoggedIn && request) {
    return <Navigate to={`/request/${request}`} replace />;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={styles.LandingPage}>
          {`LandingPage (request: ${request}, isLoggedIn: ${isLoggedIn})`}
          <Button onPress={() => dispatch(doLogin(currentPath))} label="Login" />
        </div>
      </Grid>
    </Grid>
  );
}

export default LandingPage;
