import React from 'react';
// import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
//import { useNavigate } from 'react-router';
import { useRouter, NextRouter } from "next/router";
import { RootState } from '../../../store/store';
import bars from '../../images/bars.svg';
import angledown from '../../../images/angle-down.svg';
import globe from '../../images/globe.svg';
import styles from './index.module.css';
import { doLogout, doLogin } from '../../../store/slices/authSlice';
import { selectTab } from '../../../store/slices/tabsSlice';
import { changeLang } from '../../../store/slices/langSlice';

function MenuButton() {
  // const navigate = useNavigate();
  const nextRouter: NextRouter = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  const dispatch = useDispatch();
  const handleClick = isLoggedIn ? () => dispatch(doLogout()) : () => dispatch(doLogin('/'));
  const lang = useSelector((state: RootState) => state.lang.lang);
  let buttontext = 'English';
  if (lang === 'en') {
    buttontext = 'Svenska';
  }
  return (
    <div className={styles.logoutItem}>
      <nav className={styles.dropdown} style={{ display: 'float: right;' }}>
        <button
          type="button"
          className={styles.dropbtn}
          style={{ display: 'flex' }}
        >
          <div className={styles.buttontext}>
            Menu
          </div>
          <img src={bars} alt="logo" className={styles.logo} />
        </button>
        <div className={styles.dropdowncontent}>
          <button
            type="button"
            className={styles.dropdownbutton}
            onClick={
                () => {
                  dispatch(selectTab('inbox'));
                  nextRouter.push('/home');
                }
            }
          >
            {/* <div className={styles.doprdownbuttontext}>
              <FormattedMessage id="inbox_text" />
            </div> */}
          </button>
          <button
            type="button"
            className={styles.dropdownbutton}
            onClick={() => dispatch(selectTab('consent'))}
          >
            {/* <div className={styles.doprdownbuttontext}>
              <FormattedMessage id="consents_text" />
            </div> */}
          </button>
          <button
            type="button"
            className={styles.dropdownbutton}
            onClick={() => dispatch(selectTab('mydata'))}
          >
            {/* <div className={styles.doprdownbuttontext}>
              <FormattedMessage id="my_data_text" />
            </div> */}
          </button>
          <button
            type="button"
            className={styles.dropdownbutton}
            onClick={() => dispatch(selectTab('mydata'))}
          >
            {/* <div className={styles.doprdownbuttontext}>
              <FormattedMessage id="account_details_text" />
              <img src={angledown} alt="angledown" className={styles.logoangle} />
            </div> */}
          </button>
          <button
            type="button"
            className={styles.dropdownbutton}
            onClick={() => dispatch(changeLang())}
          >
            <div className={styles.doprdownbuttontext}>
              <img src={globe} className={styles.logolang} alt="logolang" />
              {buttontext}
            </div>
          </button>
          <button
            type="button"
            className={styles.dropdownbutton}
            onClick={handleClick}
          >
            {/* <div className={styles.doprdownbuttontext}>
              <FormattedMessage id="log_out_button" />
            </div> */}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default MenuButton;
