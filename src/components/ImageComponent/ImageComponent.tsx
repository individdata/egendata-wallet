import React from 'react';
import styles from './ImageComponent.module.css';

function ImageComponent() {
  return (
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
  );
}

export default ImageComponent;
