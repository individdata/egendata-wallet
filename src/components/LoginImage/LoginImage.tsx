import React from 'react';
import styles from './LoginImage.module.css';

function LoginImage() {
  return (
    <div className={styles.left}>
      <div className={styles.leaf}>
        <img className={styles.logo} alt="left-logo" />
      </div>
      <div className={styles.title}>
        <p className={styles.first}>Your data in your control</p>
      </div>
      <div className={styles.text}>
        <div className={styles.description}>
          <p>Project Oak is a governmental service</p>
          <p>that allows you to store and transfer</p>
          <p>digital information between public and</p>
          <p>private organtisations.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginImage;
