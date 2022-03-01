import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './LoginButton.module.css';
import { loginAction } from '../../state/index';
import { State } from '../../state/reducers';

function LoginButton() {
  const authState = useSelector((state: State) => state.auth);
  const dispatch = useDispatch();
  const { login } = bindActionCreators(loginAction, dispatch);

  return (
    <div className={(authState === 'logout') ? styles.loginpage1 : styles.loginpage2}>
      <p className={styles.login}>Log in</p>
      <button
        className={styles.button}
        type="button"
        arua-label="login"
        onClick={() => login(authState)}
      >
        <div className={styles.buttontext}>
          Open Freja eID
        </div>
      </button>
      <a href="http://w3schools.com" className={styles.how}>How do I log in with Freja eID?</a>
    </div>
  );
}

export default LoginButton;
