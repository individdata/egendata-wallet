import Grid from '@mui/material/Grid';
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import styles from './index.module.css';
import { doLogin, doLogout } from '../../pages/direct/auth/login';

function LoginButton(props: any) {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  console.log(props);
  const dispatch = useDispatch();
  const handleClick = isLoggedIn
    ? () => dispatch(doLogout())
    : () => dispatch(doLogin());

  return (
    <div className={!isLoggedIn ? styles.loginpage1 : styles.loginpage2}>
      <Grid
        container
        spacing={3}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item xs={12}>
          <h2
            style={{
              color: 'white',
              paddingTop: '250px',
              fontSize: '37px',
              fontWeight: 800,
            }}
          >
            Log In
          </h2>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <button
            type="button"
            className={styles.buttonItem}
            aria-label="login"
            style={{ width: '35%', height: '100%' }}
            onClick={handleClick}
          >
            <h2>Open Freja Id</h2>
          </button>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <h2 style={{ color: 'white' }}>
            <a href="http://w3schools.com">How do I log in with Freja eID?</a>
          </h2>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginButton;
