import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import styles from './index.module.css';
import { doLogout, doLogin } from '../../pages/direct/auth/login';

function LogoutButton() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  const dispatch = useDispatch();
  const handleClick = isLoggedIn ? () => dispatch(doLogout()) : () => dispatch(doLogin());
  return (
    <div className={(isLoggedIn) ? styles.logoutavailable2 : styles.logoutavailable1}>
      <div className={styles.logout}>
        <img className={styles.logo} alt="logo" />
        <div className={styles.dropdown} style={{ display: 'inline' }}>
          <button
            type="button"
            className={styles.dropbtn}
            style={{ display: 'flex' }}
          >
            <div className={styles.buttontext}>
              {user?.name}
            </div>
            <img className={styles.arrowdown} alt="arrow down" />
          </button>
          <div className={styles.dropdowncontent}>
            <button
              type="button"
              className={styles.dropdownbutton}
              onClick={handleClick}
            >
              <div className={styles.doprdownbuttontext}>
                Log Out
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutButton;
