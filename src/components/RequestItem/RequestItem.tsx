import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './RequestItem.module.css';
import { flowAction } from '../../state/index';
import { State } from '../../state/reducers';

export interface RequestType {
  name: string,
  brief: string,
  date: string,
  content: string,
  readstatus: boolean
}

function RequestItem(props: RequestType) {
  const { name, brief, date } = props;
  const flowState = useSelector((state: State) => state.flow);
  const dispatch = useDispatch();
  const { open } = bindActionCreators(flowAction, dispatch);
  console.log(flowState);

  return (
    <div className={styles.shape}>
      <button
        type="button"
        className={
          flowState === 'unopen' || flowState === 'open'
            ? styles.requestBox1
            : styles.requestBox2
        }
        onClick={() => open(flowState)}
      >
        <img className={styles.logo} alt="logo" />
        <div className={styles.name}>{name}</div>
        <div className={styles.brief}>{brief}</div>
        <div className={styles.date}>{date}</div>
      </button>
      <div
        className={
          flowState !== 'unopen' && flowState !== 'open'
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
