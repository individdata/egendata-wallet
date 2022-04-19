/* eslint-disable import/prefer-default-export */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import styles from './index.module.css';
import { doLogin } from '../../pages/direct/auth/login';

function LoginButton(props: any) {
  const user = useSelector((state: RootState) => state.auth.user);
  // const isLoggedIn = user?.completed;
  console.log(props);
  const dispatch = useDispatch();
  return (
    <button
      className={styles.button}
      type="button"
      onClick={() => dispatch(doLogin())}
    >
      <div className={styles.buttontext}>
        login
      </div>
    </button>
  );
}

export default LoginButton;
