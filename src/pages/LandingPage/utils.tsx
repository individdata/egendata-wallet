import React from 'react';
import styles from './index.module.css';

export function Footer() {
  return (
    <div className={styles.text5}>
      Project Oak is a governmental initiative that allows you to store and
      transfer digital information between public and private organtisations.
    </div>
  );
}

export function Title() {
  return (
    <div className={styles.word1}>
      Share your data with
      <div className={styles.word2}> BNP Paribas</div>
    </div>
  );
}
