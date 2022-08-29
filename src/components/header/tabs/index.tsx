import React from 'react';
// import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useRouter, NextRouter } from "next/router";
import { RootState } from '../../../store/store';
import styles from './index.module.css';
import { selectTab } from '../../../store/slices/tabsSlice';

// import { inbox } from '../../../slices/requestsSlice';

function Tags() {
  // const navigate = useNavigate();
  const nextRouter: NextRouter = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  const tabState = useSelector((state: RootState) => state.tabs.tab);
  // console.log('tabState=', tabState);
  // console.log(tabState === 'inbox');
  const dispatch = useDispatch();

  return (
    <div className={isLoggedIn ? styles.tabbar1 : styles.tabbar2}>
      <nav>
        <div className={styles.tab}>
          <button
            className={(tabState === 'inbox') ? styles.button1 : styles.button2}
            type="button"
            arua-label="inbox"
            onClick={
                () => {
                  dispatch(selectTab('inbox'));
                  nextRouter.push('/home');
                }
            }
          >
            <div
              className={(tabState === 'inbox') ? styles.buttontext1 : styles.buttontext2}
            >
              {/* <FormattedMessage id="inbox_text" /> */}
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
              {/* <FormattedMessage id="consents_text" /> */}
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
              {/* <FormattedMessage id="my_data_text" /> */}
            </div>
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Tags;
