/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { DataRequest } from '../../pages/direct/home/inbox';
import styles from './index.module.css';
import RequestItem from '../requestItem';

export function RequestBox() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  const requests = useSelector((state: RootState) => state.requests);
  // console.log('inboxContent=', requests);
  const inbox = requests.map((request) => {
    if (request.content.type === 'http://oak.se/UnemploymentCertificateDataRequest') {
      const content = request.content as DataRequest;
      return (
        <RequestItem {...content} />
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
