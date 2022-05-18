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
        <FormattedMessage id="share_your_text" />
      </div>
      <div className={styles.word3}>
        {certificateName}
      </div>
      <div className={styles.word2}>
        <FormattedMessage id="with_text" />
      </div>
      <div className={styles.word2}>
        {requestor}
      </div>
    </div>
  );
}

export function Steps(props: Step) {
  const { status } = props;
  let contentId;
  if (status === 'idle' || status === 'fetching') {
    contentId = 'first_get_your_document_text';
  } else if (status === 'gotData' || status === 'sharing') {
    contentId = 'second_view_and_share_your_document_text';
  }
  return (
    <div className={styles.word4}>
      {contentId && <FormattedMessage id={contentId} />}
    </div>
  );
}
