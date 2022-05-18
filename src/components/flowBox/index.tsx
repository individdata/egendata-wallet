/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import { RootState } from '../../store';
import {
  FlowLogo, FlowTitle, FlowArrow, FlowText,
} from './utils';

function FlowBox() {
  const { id } = useParams();
  let requestState = 'null';
  if (id) {
    requestState = useSelector((state: RootState) => state.requests[id].status);
  }
  return (
    <div className={styles.box}>
      <div className={styles.lines}>
        <FlowTitle status={requestState} />
        <div className={styles.flow}>
          <div className={styles.showrow}>
            <FlowLogo number="1" status={requestState} />
            <FlowArrow status={requestState} />
            <FlowLogo number="2" status={requestState} />
          </div>
        </div>
        <div className={styles.texts}>
          <div className={styles.showrow}>
            <FlowText id="get_your_data_text" />
            <FlowText id="share_your_data_text" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowBox;
