/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import {
  FlowLogo, FlowTitle, FlowArrow, FlowText,
} from './utils';
import { RequestState } from '../../slices/processesSlice';
import { getProcessByRequestId } from '../../util/oak/egendata';
import { RootState } from '../../store';

function FlowBox() {
  const { id } = useParams();
  const rootState = useSelector((state: RootState) => state);
  let state: RequestState = 'void';
  if (id) {
    state = getProcessByRequestId(rootState, id).state;
  }
  return (
    <div className={styles.box}>
      <div className={styles.lines}>
        <FlowTitle state={state} />
        <div className={styles.flow}>
          <div className={styles.showrow}>
            <FlowLogo step={1} state={state} />
            <FlowArrow state={state} />
            <FlowLogo step={2} state={state} />
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
