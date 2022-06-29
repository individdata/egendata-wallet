/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import {
  FlowLogo, FlowTitle, FlowArrow, FlowText,
} from './utils';
import { RequestState } from '../../slices/processesSlice';
import { getProcessByRequestId } from '../../util/oak/egendata';
import { RootState } from '../../store';

type Props = {
  requestId: string,
};
function FlowBox({ requestId }: Props) {
  const rootState = useSelector((state: RootState) => state);
  const [status, setStatus] = useState<RequestState>('void');

  useEffect(() => {
    setStatus(getProcessByRequestId(rootState, requestId).state);
  }, [rootState]);

  return (
    <div className={styles.box}>
      <FlowTitle state={status} />
      <div className={styles.texts}>
        <div style={{ flex: 1 }} />
        <FlowLogo step={1} state={status} />
        <FlowArrow state={status} />
        <FlowLogo step={2} state={status} />
        <div style={{ flex: 1 }} />
      </div>
      <div className={styles.texts}>
        <FlowText id="get_your_data_text" />
        <FlowText id="share_your_data_text" />
      </div>
    </div>
  );
}

export default FlowBox;
