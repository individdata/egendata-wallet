import React from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineFileText } from 'react-icons/ai';
import { ImArrowUpRight2 } from 'react-icons/im';
import styles from './index.module.css';
import {
  People, ButtonProps,
} from './types';
import { setPopupData } from '../../slices/popup2Slice';

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

export function PeopleItem(props: People) {
  const { status } = props;
  const provider = 'Arbetsförmedlingen';
  const requestor = 'BNP Paribas';
  if (status === 'idle' || status === 'fetching') {
    return (
      <div className={styles.descript}>
        Get from:
        <div className={styles.from}>{provider}</div>
      </div>
    );
  }
  if (status === 'gotData') {
    return (
      <div className={styles.descript}>
        Share with:
        <div className={styles.from}>{requestor}</div>
      </div>
    );
  }
  return (
    <div className={styles.descript}>
      Shared with:
      <div className={styles.from}>{requestor}</div>
    </div>
  );
}

export function ConsentButton(props: ButtonProps) {
  const { id, status } = props;
  const dispatch = useDispatch();
  if (status === 'idle' || status === 'fetching') {
    return (
      <button
        type="button"
        className={styles.buttonBox1}
        onClick={() => {
          if (id) {
            dispatch(setPopupData({ component: 'FetchDetailPreview', props: { requestId: id } }));
          }
        }}
      >
        <div className={styles.buttonText1}>
          Get data
          <div className={styles.buttonArrow}><ImArrowUpRight2 /></div>
        </div>
      </button>
    );
  }
  if (status === 'gotData' || 'gotShareInfo') {
    return (
      <button
        type="button"
        className={styles.buttonBox2}
        onClick={() => {
          dispatch(setPopupData({ component: 'ShareDetailPreview', props: { requestId: id } }));
        }}
      >
        <div className={styles.buttonText2}>
          view and share data
          <div className={styles.buttonArrow}><ImArrowUpRight2 /></div>
        </div>
      </button>
    );
  }
  return (
    <button
      type="button"
      className={styles.buttonBox1}
    >
      <div className={styles.buttonText1}>nothing</div>
    </button>
  );
}
