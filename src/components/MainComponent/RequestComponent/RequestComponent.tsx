import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../../state/reducers';
import styles from './InboxContentBox.module.css';

function RequestComponent() {
  const inboxState = useSelector((state: State) => state.inbox);
  return (
    <div
      className={styles.box}
      style={{ display: inboxState.contentVisible }}>
      hallo, inbox
    </div>
  );
}

export default RequestComponent;