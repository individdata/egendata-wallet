import React, { useLayoutEffect, useState } from 'react';
import styles from './LoginImage.module.css';

function LoginImage() {
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  const [width] = useWindowSize();

  return (
    <div>
      { width > 1245 ? (
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
      ) : (<h2> hi</h2>)}
    </div>
  );
}

export default LoginImage;
