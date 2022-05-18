import React from 'react';
import { FormattedMessage } from 'react-intl';
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
  let content_id = '';
  if (status === 'idle' || status === 'fetching') {
    content_id = 'first_get_your_document_text';
  } else if (status === 'gotData' || status === 'sharing') {
    content_id = 'second_view_and_share_your_document_text';
  }
  return (
    <div className={styles.word4}>
      <FormattedMessage id={content_id} />
    </div>
  );
}
