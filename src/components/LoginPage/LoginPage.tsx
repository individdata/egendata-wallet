import React from 'react';
import styles from './LoginPage.module.css';

function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <img className={styles.leftlogo} alt="left-logo" />
        <p className={styles.first}>Your data in your control</p>
        <div className={styles.description}>
          <p>Project Oak is a governmental service</p>
          <p>that allows you to store and transfer</p>
          <p>digital information between public and</p>
          <p>private organtisations.</p>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.title} style={{ display: 'flex' }}>
          <img className={styles.logo} alt="logo" />
          Project
          <div className={styles.oak}>OAK</div>
        </div>
        <p className={styles.login}>Log in</p>
      </div>
    </div>
  );
}

export default LoginPage;
