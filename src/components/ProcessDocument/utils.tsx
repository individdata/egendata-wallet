import React from 'react';
import { FormattedMessage } from 'react-intl';
import { AiOutlineFileText } from 'react-icons/ai';
import styles from './index.module.css';
import { RequestState } from '../../slices/processesSlice';

export function Document() {
  return (
    <div className={styles.title}>
      <div className={styles.document}>
        <AiOutlineFileText />
      </div>
      <div className={styles.word}>
        Unemployment Certificate
      </div>
    </div>
  );
}

export function PeopleItem({ status }: { status: RequestState }) {
  const provider = 'Arbetsförmedlingen';
  const requestor = 'BNP Paribas';
  if (status === 'received' || status === 'fetching') {
    return (
      <div className={styles.descript}>
        <FormattedMessage id="get_from_text" />
        <div className={styles.from}>{provider}</div>
      </div>
    );
  }
  if (status === 'available') {
    return (
      <div className={styles.descript}>
        <FormattedMessage id="share_with_text" />
        <div className={styles.from}>{requestor}</div>
      </div>
    );
  }
  return (
    <div className={styles.descript}>
      <FormattedMessage id="share_with_text" />
      <div className={styles.from}>{requestor}</div>
    </div>
  );
}
