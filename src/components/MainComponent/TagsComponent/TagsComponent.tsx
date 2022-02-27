import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './TagsComponent.module.css';
import { tagsAction } from '../../../state/index';
import { State } from '../../../state/reducers';

function TagsComponent() {
  const authState = useSelector((state: State) => state.auth);
  const inboxState = useSelector((state: State) => state.inbox);
  const consentState = useSelector((state: State) => state.consent);
  const mydataState = useSelector((state: State) => state.mydata);
  const dispatch = useDispatch();
  const { inbox, consent, mydata } = bindActionCreators(tagsAction, dispatch);
  console.log(authState);

  return (
    <div style={{ display: authState.tags }}>
      <div>
        <div className={styles.tab}>
          <button
            className={styles.button}
            type="button"
            arua-label="inbox"
            onClick={() => inbox(inboxState)}
            style={{ backgroundColor: inboxState.buttonBackgroudColor }}
          >
            <div
              className={styles.buttontext}
              style={{ color: inboxState.buttonTextColor }}
            >
              Inbox
            </div>
          </button>
          <button
            className={styles.button}
            type="button"
            arua-label="consent"
            onClick={() => consent(consentState)}
            style={{ backgroundColor: consentState.buttonBackgroudColor }}
          >
            <div
              className={styles.buttontext}
              style={{ color: consentState.buttonTextColor }}
            >
              Consents
            </div>
          </button>
          <button
            className={styles.button}
            type="button"
            arua-label="mydata"
            onClick={() => mydata(mydataState)}
            style={{ backgroundColor: mydataState.buttonBackgroudColor }}
          >
            <div
              className={styles.buttontext}
              style={{ color: mydataState.buttonTextColor }}
            >
              My data
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TagsComponent;
