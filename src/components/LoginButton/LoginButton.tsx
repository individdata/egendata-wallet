import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './LoginButton.module.css';
import { loginAction, flowAction } from '../../state/index';
import { State } from '../../state/reducers';

function LoginButton(props: any) {
  const { redirect } = props;
  const authState = useSelector((state: State) => state.auth);
  const flowState = useSelector((state: State) => state.flow);
  const dispatch = useDispatch();
  const { login } = bindActionCreators(loginAction, dispatch);
  const { consented } = bindActionCreators(flowAction, dispatch);
  return (
    <button
      className={styles.button}
      type="button"
      arua-label="login"
      onClick={() => {
        if (redirect) {
          login(authState);
          consented(flowState);
        } else {
          login(authState);
        }
      }}
    >
      <div className={styles.buttontext}>
        Open Freja eID
      </div>
    </button>
  );
}

export default LoginButton;
