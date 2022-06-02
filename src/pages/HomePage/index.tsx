/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { RequestBox } from '../../components/requestBox';
import { doLogin } from '../../slices/authSlice';
import Button from '../../components/ui/Button';
import { getRequestsContent } from '../../slices/requestsSlice';
import Header from '../../components/header';
import styles from './index.module.css';
import { LogInText, InfoLink } from './utils';
import { subjectRequestThunks } from '../../slices/requests/subjectRequestsSlice';

function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const storage = useSelector((state: RootState) => state.auth.user?.storage);
  const isLoggedIn = user?.completed;
  const url = new URL(window.location.href);
  const currentPath = url.pathname + url.search;
  useEffect(() => {
    if (user) {
      dispatch(getRequestsContent());
      dispatch(subjectRequestThunks.getContent(storage ?? ''));
    }
  }, [user]);

  const redirectState = false;

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={styles.main} id="landingPage">
          <Header redirect={redirectState} />
          <div className={styles.loginpage}>
            <LogInText />
            {!isLoggedIn && <Button type="primary" onPress={() => dispatch(doLogin(currentPath))} id="login_button" />}
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
