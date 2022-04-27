/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import { RootState } from '../../store';
import { select } from '../../pages/direct/requestSlice';
import GetDataBox from '../getDataBox';
import ShareDataBox from '../shareDataBox';
import RequestContent from '../requestContent';
import CertificateBox from '../certificateBox';
import { InboundDataRequest } from '../../util/oak/datarequest';

function RequestItem(props: InboundDataRequest) {
  /* subject, requestedData, requestedFrom, requestedBy, */
  const {
    id,
  } = props;
  const requestState = useSelector((state: RootState) => state.requests[id]);
  const dispatch = useDispatch();

  return (
    <div key={id} className={styles.shape}>
      <button
        type="button"
        className={
          requestState?.status === 'idle' || requestState?.status === 'selected'
            ? styles.requestBox1
            : styles.requestBox2
        }
        onClick={() => dispatch(select(id))}
      >
        <img className={styles.logo} alt="logo" />
        <div className={styles.name}>reqeuster</div>
        <div className={styles.brief}>{id}</div>
        <div className={styles.date}>date</div>
      </button>
      <div>
        <div
          className={
            requestState?.status === 'consenting' || requestState?.status === 'gotData' || requestState?.status === 'sharedData'
              ? styles.transfer1
              : styles.transfer2
          }
        >
          <div className={styles.text}>{id}</div>
          <div className={styles.sourcename}>source</div>
          <img className={styles.arrow} alt="logo" />
          <div className={styles.name}>Requester</div>
          <div className={styles.date}>date</div>
        </div>
        <RequestContent {...props} />
        <GetDataBox {...props} />
        <ShareDataBox {...props} />
        <CertificateBox {...props} />
      </div>
    </div>
  );
}

export default RequestItem;
