import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { fetch, fetchInfo } from '../../pages/direct/requestSlice';
import styles from './index.module.css';
import { DataRequest } from '../../pages/direct/inbox';

function FlowBox() {
  return (
    <div className={styles.box}>
      <div className={styles.lines}>
          <div className={styles.line1}>
            <div className={styles.project}>
              Project
              <div className={styles.oak}>OAK</div>
           </div>
          </div>
          <div className={styles.line2}>
              hallo2
          </div>
          <div className={styles.line3}>
              hallo3
          </div>
      </div>
    </div>
  );
}

export default FlowBox;