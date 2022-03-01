import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Tabs.module.css';
import { tabsAction } from '../../state/index';
import { State } from '../../state/reducers';

function Tags() {
  const authState = useSelector((state: State) => state.auth);
  const tabsState = useSelector((state: State) => state.tabs);
  console.log(tabsState);
  const dispatch = useDispatch();
  const { inbox, consent, mydata } = bindActionCreators(tabsAction, dispatch);

  return (
    <div className={(authState === 'login') ? styles.tabbar1 : styles.tabbar2}>
      <div>
        <div className={styles.tab}>
          <button
            className={(tabsState === 'inbox') ? styles.button1 : styles.button2}
            type="button"
            arua-label="inbox"
            onClick={() => inbox(tabsState)}
          >
            <div
              className={(tabsState === 'inbox') ? styles.buttontext1 : styles.buttontext2}
            >
              Inbox
            </div>
          </button>
          <button
            className={(tabsState === 'consent') ? styles.button1 : styles.button2}
            type="button"
            arua-label="consent"
            onClick={() => consent(tabsState)}
          >
            <div
              className={(tabsState === 'consent') ? styles.buttontext1 : styles.buttontext2}
            >
              Consents
            </div>
          </button>
          <button
            className={(tabsState === 'mydata') ? styles.button1 : styles.button2}
            type="button"
            arua-label="mydata"
            onClick={() => mydata(tabsState)}
          >
            <div
              className={(tabsState === 'mydata') ? styles.buttontext1 : styles.buttontext2}
            >
              My data
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tags;
