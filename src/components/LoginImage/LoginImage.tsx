import React from 'react';
import styles from './LoginImage.module.css';

function LoginImage() {
  return (
    <div>
      <div className={styles.left}>
        <div className={styles.leaf}>
          <img className={styles.logo} alt="left-logo" />
        </div>
        <div className={styles.title}>
          <p className={styles.first}>Your data in your control</p>
        </div>
        <div className={styles.text}>
          <div className={styles.description}>
            <h3 className={styles.paragraph}>Project Oak is a governmental service</h3>
            <h3 className={styles.paragraph}>that allows you to store and transfer</h3>
            <h3 className={styles.paragraph}>digital information between public and</h3>
            <h3 className={styles.paragraph}>private organtisations.</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginImage;
