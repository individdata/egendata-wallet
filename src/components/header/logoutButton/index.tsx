import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import styles from './index.module.css';
import { doLogout, doLogin } from '../../../store/slices/authSlice';
import { useSession } from 'next-auth/react';

function LogoutButton() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  const dispatch = useDispatch();
  const handleClick = isLoggedIn ? () => dispatch<any>(doLogout()) : () => dispatch<any>(doLogin('/'));
  const { data: session } = useSession();
  console.log({ session })
  return (
    <div className={styles.logoutItem}>
      <div className={styles.dropdown} style={{ display: 'float: left' }}>
        <button
          type="button"
          className={styles.dropbtn}
          style={{ display: 'flex' }}
        >
          <img className={styles.logo} alt="logo" />
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
              <FormattedMessage id="log_out_button" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutButton;
