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
  console.log('processes',processes);

  if (!processes || Object.keys(processes).length === 0) {
    return null;
  }

  const lists = Object.keys(requests).reduce((acc: any, requestKey) => { // TODO: Define acc type
    const request = requests[requestKey];
    const process = processes[requestKey];
    if (!request || !process) {
      return acc;
    }

    if (!acc[process.state]) {
      acc[process.state] = []
    }

    acc[process.state].push(request);
    return acc;
  }, {});

  const sharedRequests = lists['shared'] || [];

  const nonSharedRequests = [
    ...(lists['available'] || []),
    ...(lists['received'] || []),
    ...(lists['fetching'] || []),
  ];

  const sharedInbox = sharedRequests.map((request: SubjectRequest) => {
    if (request.documentType === 'http://egendata.se/schema/core/v1#UnemploymentCertificate') {
      const content = request as SubjectRequest;
      return (
        <div key={request.id}>
          <RequestItem {...content} />
        </div>
      );
    }
    return null;
  });

const nonSharedInbox = nonSharedRequests.map((request: SubjectRequest) => {
  if (request.documentType === 'http://egendata.se/schema/core/v1#UnemploymentCertificate') {
    const content = request as SubjectRequest;
    return (
      <div key={request.id}>
        <RequestItem {...content} dot />
      </div>
    );
  }
  return null;
});

  return (
    <div className={styles.box}>
      <div>Non shared Items</div>
      <div className={isLoggedIn ? styles.requestBoxDisplay : styles.requestBoxDisappear}>
        {nonSharedInbox}
      </div>
      <div>Shared Items</div>
      <div className={isLoggedIn ? styles.requestBoxDisplay : styles.requestBoxDisappear}>
        {sharedInbox}
      </div>
    </div>
  );
}

export default RequestBox;
