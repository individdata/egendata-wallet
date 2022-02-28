import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../../state/reducers';
import styles from './InboxContentBox.module.css';
import RequestComponent from '../../RequestComponent/RequestComponent';

function InboxConsentBox() {
  const inboxState = useSelector((state: State) => state.inbox);
  const name = 'BNP Parbas';
  const brief = 'Request to data transfer';
  const date = '2022-04-18';
  const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Your consent is needed to send the data from Arbetsförmedlingen to BNP Paribas';
  const readstatus = false;
  return (
    <div
      className={styles.box}
      style={{ display: inboxState.contentVisible }}
    >
      <RequestComponent
        name={name}
        brief={brief}
        date={date}
        content={content}
        readstatus={readstatus}
      />
    </div>
  );
}

export default InboxConsentBox;
