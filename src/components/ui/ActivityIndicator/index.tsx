import React from 'react';
import styles from './index.module.css';

type Props = {
  text: string,
};

function ActivityIndicator(props: Props) {
  const { text } = props;

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {text}
      </div>
      <div className={styles.spinner}>
        <div />
      </div>
    </div>
  );
}

export default ActivityIndicator;
