import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as Checked } from '../images/checkMark.svg';
import { RequestState } from '../../store/slices/processesSlice';
import styles from './index.module.css';
import {
  Text,
} from './types';

export function FlowTitle({ state }: { state: RequestState }) {
  if (state === 'shared') {
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

export function FlowLogo({ step, state }: { step: number, state: RequestState }) {
  if ((state === 'received' && step === 1) || (state === 'available' && step === 2)) {
    return (
      <div className={styles.logogreen}>
        <div className={styles.numbergreen}>{step}</div>
      </div>
    );
  }
  if ((state === 'available' && step === 1) || state === 'shared') {
    return (
      <div className={styles.l}>
        <Checked />
      </div>
    );
  }
  return (
    <div className={styles.logogrey}>
      <div className={styles.number}>{step}</div>
    </div>
  );
}

export function FlowText(props: Text) {
  const { id } = props;
  return (
    <div className={styles.text}>
      <FormattedMessage id={id} />
    </div>
  );
}

export function FlowArrow({ state }: { state: RequestState }) {
  return (
    <div className={styles.arrowflow}>
      <img className={(state === 'received') ? styles.greenarrow : styles.greyarrow} alt="arrow" />
    </div>
  );
}
