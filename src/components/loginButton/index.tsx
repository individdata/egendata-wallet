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
  // const loggedIn = isLoggedIn ? (
  //  <div className="user">
  //    logged in user:
  //   {' '}
  //    {user?.name}
  //  </div>
  // ) : <div />;
  const dispatch = useDispatch();
  // const handleClick = isLoggedIn ? () => dispatch(doLogout()) : () => dispatch(doLogin());
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
