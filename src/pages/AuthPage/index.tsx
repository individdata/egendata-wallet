import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import { RootState } from '../../store';
import Header from '../../components/header';
import Button from '../../components/ui/Button';
import { doLogin } from '../../slices/authSlice';

function AuthPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const intl = useIntl();
  const isLoggedIn = user?.completed;
  const url = new URL(window.location.href);
  const currentPath = url.pathname + url.search;

  const dispatch = useDispatch();
  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <img className={styles.logo} alt="left-logo" />
        <div className={styles.title}><FormattedMessage id="image_page_title" /></div>
        <div className={styles.subtitle}><FormattedMessage id="image_page_description" /></div>
      </div>
      <div className={styles.right}>
        <Header />
        <div className={styles.loginbody}>
          <p className={styles.login}>
            <FormattedMessage id="log_in_text" />
          </p>
          {!isLoggedIn && (
            <Button
              preset="medium"
              type="primary"
              onPress={() => dispatch(doLogin(currentPath))}
            >
              {intl.formatMessage({ id: 'login_button' })}
            </Button>
          )}
          <div className={styles.line}>
            <a href="http://w3schools.com" className={styles.link}>
              <FormattedMessage id="home_page_link" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
