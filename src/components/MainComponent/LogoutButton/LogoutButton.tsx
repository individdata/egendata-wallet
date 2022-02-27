import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './LogoutButton.module.css';
import { loginAction } from '../../../state/index';
import { State } from '../../../state/reducers';

function LogoutButton() {
  const logoutState = useSelector((state: State) => state.auth);
  const dispatch = useDispatch();
  const { logout } = bindActionCreators(loginAction, dispatch);

  return (
    <div className={styles.logout} style={{ display: logoutState.uncertified }}>
      <img className={styles.logo} alt="logo" />
      <div className={styles.dropdown} style={{ display: 'inline' }}>
        <button
          type="button"
          className={styles.dropbtn}
          style={{ display: 'flex' }}
        >
          <div className={styles.buttontext}>
            Marcello Grita
          </div>
          <img className={styles.arrowdown} alt="arrow down" />
        </button>
        <div className={styles.dropdowncontent}>
          <button
            type="button"
            className={styles.dropdownbutton}
            onClick={() => logout(logoutState)}
          >
            <div className={styles.doprdownbuttontext}>
              Log Out
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutButton;
