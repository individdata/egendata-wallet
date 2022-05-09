/* eslint-disable import/prefer-default-export */
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './index.module.css';
import { doLogin } from '../../slices/authSlice';

function LoginButton() {
  // const isLoggedIn = user?.completed;
  // console.log(props);
  const dispatch = useDispatch();
  return (
    <button
      className={styles.button}
      type="button"
      onClick={() => dispatch(doLogin('/'))}
      id="landingPage-login"
    >
      <div className={styles.buttontext}>
        login
      </div>
    </button>
  );
}

export default LoginButton;
