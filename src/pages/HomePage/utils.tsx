import React from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import { RootState } from '../../store';

export function LogInText() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  if (!isLoggedIn) {
    return (
      <div className={styles.firstline}>
        <p className={styles.login}>Log in</p>
      </div>
    );
  }
  return (<div />);
}

export function InfoLink() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  if (!isLoggedIn) {
    return (
      <div className={styles.thirdline}>
        <a href="http://w3schools.com" className={styles.how}>How do I log in with Freja eID?</a>
      </div>
    );
  }
  return (<div />);
}
