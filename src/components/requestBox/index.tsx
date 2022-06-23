/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './index.module.css';
import RequestItem from '../requestItem';
import { SubjectRequest } from '../../slices/requests/subjectRequestsSlice';

export function RequestBox() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  const requests = useSelector((state: RootState) => state.subjectRequests.items);
  const processes = useSelector((state: RootState) => state.process);
  console.log(processes);

  const sharedInbox = Object.keys(requests).map((requestKey) => {
    const request = requests[requestKey];
    const process = processes[requestKey];
    console.log(process.state);
    if (request.documentType === 'http://egendata.se/schema/core/v1#UnemploymentCertificate') {
      const content = request as SubjectRequest;
      return (
        <div key={requestKey}>
          <RequestItem {...content} />
        </div>
      );
    }
    return null;
  });

  return (
    <div className={styles.box}>
      <div>Shared Items</div>
      <div className={isLoggedIn ? styles.requestBoxDisplay : styles.requestBoxDisappear}>
        {sharedInbox}
      </div>
    </div>
  );
}

export default RequestBox;
