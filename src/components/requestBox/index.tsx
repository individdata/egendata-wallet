/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './index.module.css';
import RequestItem from '../requestItem';
import { inboxContent, DataRequest } from '../../pages/direct/home/fetchrequests';
import RequestConsent from '../requestConsent';

function RequestsBox() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [requests, setRequests] = useState<DataRequest[]>();
  const isLoggedIn = user?.completed;
  const inboxUrl = `${user?.storage} + 'oak/inbox/'`;

  useEffect(() => {
    inboxContent(inboxUrl).then((req) => {
      setRequests(req);
    });
  }, []);

  console.log('requests=', requests);

  const name = 'BNP Parbas';
  const brief = 'Request to data transfer';
  const date = '2022-04-18';
  const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Your consent is needed to send the data from Arbetsförmedlingen to BNP Paribas';

  const readstatus = true;
  return (
    <div className={styles.box}>
      <div className={(!isLoggedIn) ? styles.tagsContent1 : styles.tagsContent2}>
        <RequestItem
          name={name}
          brief={brief}
          date={date}
          content={content}
          readstatus={readstatus}
        />

        <RequestConsent
          name={name}
          brief={brief}
          date={date}
          content={content}
          readstatus={readstatus}
        />

        <div>
          {requests?.map((item) => {
            if (item.type === 'http://oak.se/UnemploymentCertificateDataRequest') {
              const i = item as DataRequest;
              console.log(i);
              return (
                <RequestItem
                  name="BNP Parbas"
                  brief={i.id}
                  date="2022-03-25"
                  content={i.id}
                  readstatus={readstatus}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>

  );
}

export default RequestsBox;
