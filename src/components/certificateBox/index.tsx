import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { inbox } from '../../pages/direct/requestSlice';
import styles from './index.module.css';
import { InboundDataRequest } from '../../util/oak/datarequest';

function CertificateBox(props: InboundDataRequest) {
  /* subject, requestedData, requestedFrom, requestedBy, */
  const {
    id,
  } = props;
  const requestState = useSelector((state: RootState) => state.requests[id]);
  const dispatch = useDispatch();

  return (
    <div
      className={
        requestState?.status === 'sharedData'
          ? styles.main1
          : styles.main2
      }
    >
      <div className={styles.box}>
        <img className={styles.certificate} alt="logo" />
        <div className={styles.text}>
          Your unemployement certificat
          {id}
          is now being shared with requester.
        </div>
        <div className={styles.text2}>
          Your unemployement certificat is now being shared with requester.
        </div>
        <button
          className={styles.button}
          type="button"
          onClick={() => dispatch(inbox())}
        >
          <div className={styles.buttontext}>Return to requesting service</div>
        </button>
      </div>
    </div>
  );
}

export default CertificateBox;
