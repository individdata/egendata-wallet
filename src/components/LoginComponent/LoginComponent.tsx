import React from 'react';
import styles from './LoginComponent.module.css';
import ImageComponent from '../ImageComponent/ImageComponent';
import MainComponent from '../MainComponent/MainComponent';

function LoginComponent() {
  return (
    <div className={styles.main}>
      <ImageComponent />
      <MainComponent />
    </div>
  );
}

export default LoginComponent;
