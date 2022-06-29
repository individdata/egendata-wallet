/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import { RootState } from '../../store';
import {
  Document, PeopleItem, ConsentButton,
} from './utils';
import { RequestState } from '../../slices/processesSlice';
import { getProcessByRequestId } from '../../util/oak/egendata';

function ConsentBox() {
  const { id } = useParams();
  const rootState = useSelector((state: RootState) => state);

  let requestState: RequestState = 'void';
  let providerWebId = '';
  if (id) {
    requestState = getProcessByRequestId(rootState, id).state;
    providerWebId = useSelector((state: RootState) => state.subjectRequests.items[id].providerWebId);
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
            <ConsentButton id={id} status={requestState} providerWebId={providerWebId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsentBox;
