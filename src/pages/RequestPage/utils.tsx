import React from 'react';
import styles from './index.module.css';
import { Step } from './types';

export function Title() {
  const certificateName = ' Unemployment certificate';
  const requestor = 'BNP Partibas';
  return (
    <div className={styles.word1}>
      <div className={styles.word2}>
        Share your
      </div>
      <div className={styles.word3}>
        {certificateName}
      </div>
      <div className={styles.word2}>
        with
      </div>
      <div className={styles.word2}>
        {requestor}
      </div>
    </div>
  );
}

export function Steps(props: Step) {
  const { status } = props;
  let content = '';
  if (status === 'idle' || status === 'fetching') {
    content = '1. Get your document';
  } else if (status === 'gotData') {
    content = '2. View and share your document';
  }
  return (
    <div className={styles.word4}>
      {content}
    </div>
  );
}
