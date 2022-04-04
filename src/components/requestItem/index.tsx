import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import { RootState } from '../../store';
import { consent } from '../../pages/direct/home/flowSlice';

export interface RequestType {
  name: string,
  brief: string,
  date: string,
  content: string,
  readstatus: boolean
}

function RequestItem(props: RequestType) {
  const { name, brief, date } = props;
  const flowState = useSelector((state: RootState) => state.flow.flow);
  const dispatch = useDispatch();
  const handleClick = (flowState === 'uncheck') ? () => dispatch(consent('checking')) : () => dispatch(consent('consenting'));

  return (
    <div className={styles.shape}>
      <button
        type="button"
        className={
          flowState === 'uncheck' || flowState === 'checking'
            ? styles.requestBox1
            : styles.requestBox2
        }
        onClick={handleClick}
      >
        <img className={styles.logo} alt="logo" />
        <div className={styles.name}>{name}</div>
        <div className={styles.brief}>{brief}</div>
        <div className={styles.date}>{date}</div>
      </button>
      <div
        className={
          flowState !== 'uncheck' && flowState !== 'checking'
            ? styles.transfer1
            : styles.transfer2
        }
      >
        <div className={styles.text}>Data transfer</div>
        <div className={styles.sourcename}>Arbetsförmedlingen</div>
        <img className={styles.arrow} alt="logo" />
        <div className={styles.name}>{name}</div>
        <div className={styles.date}>{date}</div>
      </div>
    </div>
  );
}

export default RequestItem;
