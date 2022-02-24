import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MainComponent.module.css';
import { actionCreators } from '../../state/index';

function LoginButton() {
  const loginState = useSelector((state: any) => state.login);
  const dispatch = useDispatch();

  const { login } = bindActionCreators(actionCreators, dispatch);

  return (
    <button
      className={styles.button}
      type="button"
      arua-label="login"
      onClick={() => login(loginState)}
    >
      Open Freja eID
    </button>
  );
}

export default LoginButton;
