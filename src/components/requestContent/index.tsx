import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { selectTab } from '../../pages/direct/tabsSlice';
import { consent } from '../../pages/direct/requestSlice';
import styles from './index.module.css';
import { InboundDataRequest } from '../../util/oak/datarequest';

function RequestContent(props: InboundDataRequest) {
  const {
    id,
  } = props;
  const requestState = useSelector((state: RootState) => state.requests[id]);
  const dispatch = useDispatch();

  return (
    <div className={(requestState?.status === 'selected') ? styles.requestContent1 : styles.requestContent2}>
      <div style={{ display: 'inline' }}>
        <div className={styles.content}>
          <div>
            id:
            {id}
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
