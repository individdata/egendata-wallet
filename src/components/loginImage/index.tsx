import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.css';

function LoginImage() {
  return (
    <div className={styles.main}>
      <div className={styles.leaf}>
        <img className={styles.logo} alt="left-logo" />
      </div>
      <div className={styles.titleContainer}>
        <p className={styles.title}>
          <FormattedMessage id="image_page_title" />
        </p>
      </div>
      <div className={styles.textContainer}>
        <p className={styles.text}>
          <FormattedMessage id="image_page_description" />
        </p>
      </div>
    </div>
  );
}

export default LoginImage;
