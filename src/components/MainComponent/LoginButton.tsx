import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MainComponent.module.css';
import { actionCreators } from '../../state/index';

function LoginButton() {
  const loginState = useSelector((state: any) => state.login);
  const dispatch = useDispatch();
  const { login } = bindActionCreators(actionCreators, dispatch);
  let displayvalue = 'inline';
  if (loginState) {
    displayvalue = 'none';
  }
  return (
    <div style={{ display: displayvalue }}>
      <p className={styles.login}>Log in</p>
      <button
        className={styles.button}
        type="button"
        arua-label="login"
        onClick={() => login(loginState)}
      >
        Open Freja eID
      </button>
      <a href="http://w3schools.com" className={styles.how}>How do I log in with Freja eID?</a>
    </div>
  );
}

export default LoginButton;
