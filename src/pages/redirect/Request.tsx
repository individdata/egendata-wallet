/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css';
import { RootState } from '../../store';
import { doLogin } from '../auth/login';
import OakLogo from '../../components/oakLogo';

export function HandleRequest() {
  const currentURL = window.location.href;
  const url = new URL(currentURL);
  const currentPath = url.pathname + url.search;
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  const dispatch = useDispatch();
  const handleClick = () => dispatch(doLogin(currentPath));

  if (user) {
    const redirectPath = localStorage.getItem('redirectPath');
    return (
      <div className="consent">
        <h1>Consent Page</h1>
        {redirectPath}
      </div>
    );
  }
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <OakLogo />
        </div>
      </div>
      <div className={styles.body}>
        <div className={isLoggedIn ? styles.notshowtext1 : styles.showtext1}>
          <div className={styles.word1}>
            Share your data with
            <div className={styles.word2}> BNP Paribas</div>
          </div>
        </div>
        <button type="button" className={styles.button} onClick={handleClick}>
          <div className={styles.buttontext}>
            Continue
          </div>
        </button>
      </div>
      <div className={styles.footer}>
        <div className={styles.text5}>
          Project Oak is a governmental initiative that allows you to store and transfer digital information between public and private organtisations.
        </div>
      </div>
    </div>
  );
}
