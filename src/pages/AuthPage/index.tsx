import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import LoginImage from '../../components/loginImage';
import { RootState } from '../../store';
import Header from '../../components/header';
import Button from '../../components/ui/Button';
import { doLogin } from '../../slices/authSlice';

function AuthPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  const url = new URL(window.location.href);
  const currentPath = url.pathname + url.search;
  const redirectState = false;

  const dispatch = useDispatch();
  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <LoginImage />
      </div>
      <div className={styles.right}>
        <Header redirect={redirectState} />
        <div className={styles.loginContiner}>
          <div className={styles.loginbody}>
            <div className={styles.line}>
              <p className={styles.login}>
                <FormattedMessage id="log_in_text" />
              </p>
            </div>
            {!isLoggedIn && (
              <Button
                type="primary"
                onPress={() => dispatch(doLogin(currentPath))}
                id="login_button"
              />
            )}
            <div className={styles.line}>
              <a href="http://w3schools.com" className={styles.link}>
                <FormattedMessage id="home_page_link" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
