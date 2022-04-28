import React from 'react';
import { useDispatch } from 'react-redux';
import { selectTab } from '../../pages/direct/tabsSlice';
import { consent } from '../../pages/direct/requestSlice';
import styles from './index.module.css';
import { InboundDataRequest } from '../../util/oak/datarequest';

function RequestContent(props: InboundDataRequest) {
  const {
    id,
  } = props;
  const dispatch = useDispatch();

  return (
    <div className={(false) ? styles.requestContent1 : styles.requestContent2}>
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
          onClick={() => { dispatch(fetch(id)); dispatch(selectTab('consent')); }}
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
