import React from 'react';
import { ReactComponent as ReactLogo } from '../../images/checkMark.svg';
import styles from './index.module.css';
import {
  Title, Logo, Text, Arrow,
} from './types';

export function FlowTitle(props: Title) {
  const { status } = props;
  if (status === 'null') {
    return (
      <div className={styles.projectOak}>
        <div className={styles.project}>
          Project
          <div className={styles.oak}>OAK</div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.space} />
  );
}

export function FlowLogo(props: Logo) {
  const { number, status } = props;
  if ((status === 'idle' && number === '1') || (status === 'gotdata' && number === '2')) {
    return (
      <div className={styles.logogreen}>
        <div className={styles.numbergreen}>{number}</div>
      </div>
    );
  }
  if ((status === 'gotdata' && number === '1') || status === 'shareddata') {
    return (
      <div className={styles.l}>
        <ReactLogo />
      </div>
    );
  }
  return (
    <div className={styles.logogrey}>
      <div className={styles.number}>{number}</div>
    </div>
  );
}

export function FlowText(props: Text) {
  const { text } = props;
  return (
    <div className={styles.text}>{text}</div>
  );
}

export function FlowArrow(props: Arrow) {
  const { status } = props;
  return (
    <div className={styles.arrowflow}>
      <img className={(status === 'null') ? styles.greenarrow : styles.greyarrow} alt="arrow" />
    </div>
  );
}
