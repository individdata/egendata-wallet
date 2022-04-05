/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import styles from './index.module.css';
import RequestItem from '../requestItem';
import { inboxContent, DataRequest } from '../../pages/direct/home/fetchrequests';
// import RequestContent from '../RequsetContent/RequestContent';
// import GetDataBox from '../GetDataBox/GetDataBox';
// import ShareDataBox from '../ShareDataBox/ShareDataBox';

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
  const readstatus = true;
  return (
    <div className={styles.box}>
      <div className={(isLoggedIn) ? styles.tagsContent1 : styles.tagsContent2}>
        <div>whywhy</div>
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
