import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './TagsComponent.module.css';
import { actionCreators } from '../../../state/index';

function TagsComponent() {
  const loginState = useSelector((state: any) => state.login);
  const inboxState = useSelector((state: any) => state.inbox);
  const consentState = useSelector((state: any) => state.consent);
  const mydataState = useSelector((state: any) => state.mydata);
  const dispatch = useDispatch();
  const { inbox, consent, mydata } = bindActionCreators(actionCreators, dispatch);
  let displayvalue = 'none';
  if (loginState) {
    displayvalue = 'inline';
  }
  return (
    <div style={{ display: displayvalue }}>
      <div>
        <div className={styles.tab}>
          <button
            className="tablinks"
            type="button"
            arua-label="inbox"
            onClick={() => inbox(inboxState)}
          >
            Inbox
          </button>
          <button
            className="tablinks"
            type="button"
            arua-label="consent"
            onClick={() => consent(consentState)}
          >
            Consents
          </button>
          <button
            className="tablinks"
            type="button"
            arua-label="mydata"
            onClick={() => mydata(mydataState)}
          >
            My Data
          </button>
        </div>
      </div>
      <div id="London" className={styles.tabcontent}>
        <h3>London</h3>
        <p>London is the capital city of England.</p>
      </div>
      <div id="Paris" className={styles.tabcontent}>
        <h3>Paris</h3>
        <p>Paris is the capital of France.</p>
      </div>
      <div id="Tokyo" className={styles.tabcontent}>
        <h3>Tokyo</h3>
        <p>Tokyo is the capital of Japan.</p>
      </div>
    </div>
  );
}

export default TagsComponent;
