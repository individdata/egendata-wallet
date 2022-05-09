/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './index.module.css';
import RequestItem from '../requestItem';
import { InboundDataRequest } from '../../util/oak/templates';

export function RequestBox() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  const requests = useSelector((state: RootState) => state.requests);
  console.log('requests:', requests);
  // console.log('inboxContent=', requests);
  const inbox = Object.keys(requests).map((requestKey) => {
    const request = requests[requestKey];
    if (request.content.documentType === 'http://egendata.se/schema/core/v1#UnemploymentCertificate') {
      const content = request.content as InboundDataRequest;
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
      <div className={isLoggedIn ? styles.requestBoxDisplay : styles.requestBoxDisappear}>
        {inbox}
      </div>
    </div>
  );
}

export default RequestBox;
