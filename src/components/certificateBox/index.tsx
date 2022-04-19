import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { inbox } from '../../pages/direct/home/requestSlice';
import styles from './index.module.css';
import { DataRequest } from '../../pages/direct/home/inbox';

function CertificateBox(props: DataRequest) {
  /* subject, requestedData, requestedFrom, requestedBy, */
  const {
    id,
  } = props;
  const requestState = useSelector((state: RootState) => (state.requests.find((request) => (request.id === id))));
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
