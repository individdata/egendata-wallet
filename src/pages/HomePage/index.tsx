/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { RequestBox } from '../../components/requestBox';
import { doLogin } from '../../slices/authSlice';
import Button from '../../components/ui/Button';
import { getRequestsContent } from '../../slices/requestSlice';
import Header from '../../components/header';
import styles from './index.module.css';
import { LogInText, InfoLink } from './utils';

function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  const url = new URL(window.location.href);
  const currentPath = url.pathname + url.search;
  useEffect(() => {
    dispatch(getRequestsContent());
  }, [user]);

  const redirectState = false;
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={styles.main} id="landingPage">
          <Header redirect={redirectState} />
          <div className={styles.loginpage}>
            <LogInText />
            {!isLoggedIn && <Button onPress={() => dispatch(doLogin(currentPath))} label="Login" />}
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
