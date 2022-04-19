import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { DataRequest } from '../../pages/direct/home/inbox';
import { selectTab } from '../../pages/direct/home/tabsSlice';
import { consent } from '../../pages/direct/home/requestSlice';
import styles from './index.module.css';

function RequestContent(props: DataRequest) {
  const {
    id, subject, requestedData, requestedFrom, requestedBy,
  } = props;
  const requestState = useSelector((state: RootState) => state.requests.find((request) => request.id === id));
  const dispatch = useDispatch();

  return (
    <div className={(requestState?.status === 'selected') ? styles.requestContent1 : styles.requestContent2}>
      <div style={{ display: 'inline' }}>
        <div className={styles.content}>
          <div>
            id:
            {id}
          </div>
          <div>
            subject:
            {subject}
          </div>
          <div>
            requestedData:
            {requestedData}
          </div>
          <div>
            requestedFrom:
            {requestedFrom}
          </div>
          <div>
            requestedBy:
            {requestedBy}
          </div>
        </div>
        <button
          className={styles.button}
          type="button"
          onClick={() => { dispatch(consent(id)); dispatch(selectTab('consent')); }}
        >
          <div className={styles.buttontext}>
            consent
          </div>
        </button>
      </div>
    </div>
  );
}

export default RequestContent;
