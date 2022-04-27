/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import { RootState } from '../../store';
import {
  Document, PeopleItem, ConsentButton,
} from './utils';

function ConsentBox() {
  const { id } = useParams();
  let requestState = 'null';
  if (id) {
    requestState = useSelector((state: RootState) => state.requests[id].status);
  }
  return (
    <div className={styles.box}>
      <div className={styles.columns}>
        <div className={styles.rows}>
          <div className={styles.documentrow}>
            <Document />
          </div>
          <div className={styles.peoplerow}>
            <PeopleItem status={requestState} />
          </div>
        </div>
        <div className={styles.buttoncolumn}>
          <div className={styles.buttonbox}>
            <ConsentButton id={id} status={requestState} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsentBox;
