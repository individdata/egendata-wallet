import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import styles from './index.module.css';
import { selectTab } from '../../pages/direct/tabsSlice';
import { inbox } from '../../pages/direct/requestSlice';

function Tags() {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  const tabState = useSelector((state: RootState) => state.tabs.tab);
  // console.log('tabState=', tabState);
  // console.log(tabState === 'inbox');
  const dispatch = useDispatch();

  return (
    <div className={isLoggedIn ? styles.tabbar1 : styles.tabbar2}>
      <div>
        <div className={styles.tab}>
          <button
            className={(tabState === 'inbox') ? styles.button1 : styles.button2}
            type="button"
            arua-label="inbox"
            onClick={
                () => { dispatch(selectTab('inbox')); dispatch(inbox()); }
            }
          >
            <div
              className={(tabState === 'inbox') ? styles.buttontext1 : styles.buttontext2}
            >
              Inbox
            </div>
          </button>
          <button
            className={(tabState === 'consent') ? styles.button1 : styles.button2}
            type="button"
            arua-label="consent"
            onClick={() => dispatch(selectTab('consent'))}
          >
            <div
              className={(tabState === 'consent') ? styles.buttontext1 : styles.buttontext2}
            >
              Consents
            </div>
          </button>
          <button
            className={(tabState === 'mydata') ? styles.button1 : styles.button2}
            type="button"
            arua-label="mydata"
            onClick={() => dispatch(selectTab('mydata'))}
          >
            <div
              className={(tabState === 'mydata') ? styles.buttontext1 : styles.buttontext2}
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
