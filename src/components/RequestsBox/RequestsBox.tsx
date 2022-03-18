/* eslint-disable max-len */
import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../state/reducers';
import styles from './RequestsBox.module.css';
import RequestItem from '../RequestItem/RequestItem';
import RequestContent from '../RequsetContent/RequestContent';
import GetDataBox from '../GetDataBox/GetDataBox';
import ShareDataBox from '../ShareDataBox/ShareDataBox';

function RequestsBox() {
  const authState = useSelector((state: State) => state.auth);
  const name = 'BNP Parbas';
  const brief = 'Request to data transfer';
  const date = '2022-04-18';
  const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Your consent is needed to send the data from Arbetsförmedlingen to BNP Paribas';
  const readstatus = false;
  return (
    <div className={styles.box}>
      <div className={(authState === 'logout') ? styles.tagsContent1 : styles.tagsContent2}>
        <RequestItem
          name={name}
          brief={brief}
          date={date}
          content={content}
          readstatus={readstatus}
        />
        <RequestContent
          name={name}
          brief={brief}
          date={date}
          content={content}
          readstatus={readstatus}
        />
        <GetDataBox />
        <ShareDataBox
          name={name}
          brief={brief}
          date={date}
          content={content}
          readstatus={readstatus}
        />
      </div>
    </div>
  );
}

export default RequestsBox;
