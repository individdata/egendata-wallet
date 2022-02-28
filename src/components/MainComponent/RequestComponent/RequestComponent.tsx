import React from 'react';
import styles from './RequestComponent.module.css';

export interface RequestType {
  name: string,
  brief: string,
  date: string,
  content: string,
  readstatus: boolean
}

function RequestComponent(props: RequestType) {
  const { name, brief, date } = props;
  return (
    <button
      type="button"
      className={styles.requestBox}
      style={{ display: 'flex' }}
    >
      <img className={styles.logo} alt="logo" />
      <div className={styles.name}>
        {name}
      </div>
      <div className={styles.brief}>
        {brief}
      </div>
      <div className={styles.date}>
        {date}
      </div>
    </button>
  );
}

export default RequestComponent;
