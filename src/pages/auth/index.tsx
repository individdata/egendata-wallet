import React from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css';
import LoginImage from '../../components/loginImage';
import { RootState } from '../../store';
import Header from '../../components/header';
import { InfoLink, LogInText } from '../HomePage/utils';
import Button from '../../components/ui/Button';
import { doLogin } from '../../slices/authSlice';

function AuthPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  const url = new URL(window.location.href);
  const currentPath = url.pathname + url.search;
  const redirectState = false;

  return (

    <Grid container spacing={3} className="App" sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      {!isLoggedIn && (
        <>
          <Grid className={styles.left} item xs={12} md={6}>
            <LoginImage />
          </Grid>
          <Grid xs={12} md={6} item>
            <Header redirect={redirectState} />
            <div className={styles.loginpage}>
              <LogInText />
              {!isLoggedIn && <Button type="primary" onPress={() => dispatch(doLogin(currentPath))} label="Login" />}
              <InfoLink />
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default AuthPage;
