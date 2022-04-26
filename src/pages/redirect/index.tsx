import React from 'react';
// import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css';

// import Grid from '@mui/material/Grid';
// import { useSearchParams } from 'react-router-dom';

import { RootState } from '../../store';
import { doLogin } from '../auth/login';
import OakLogo from '../../components/oakLogo';
import LogoutButton from '../../components/logoutButton/redirect';
import { createRequest } from '../../util/Inbound/InboundDataRequest';
import BlueBtnCard from '../../components/requestBluebtnCard/RequestBlueBtncard';
import LandingTextBox from '../../components/landingTextBox/LandingTextBox';

export function RedirectPage() {
  // const [searchParams] = useSearchParams();
  // const requestorWebId = searchParams.get('requestorWebId');
  // const providerWebId = searchParams.get('providerWebId');
  // const documentType = searchParams.get('documentType');
  // console.log('requestorWebId=', requestorWebId);
  // console.log('providerWebId=', providerWebId);
  // console.log('documentType=', documentType);
  createRequest();
  const currentURL = window.location.href;
  const url = new URL(currentURL);
  const currentPath = url.pathname + url.search;
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  const dispatch = useDispatch();
  const handleClick = () => dispatch(doLogin(currentPath));

  const style2 = {
    columnCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    miniBox: {
      display: 'flex',
      justifyContent: 'center',
      width: '40%',
      padding: '10px',
      minWidth: '315px',
    },
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <OakLogo />
        </div>
        <div className={styles.logoname}>
          <LogoutButton />
        </div>
      </div>
      <div className={styles.body}>
        <div className={isLoggedIn ? styles.notshowtext1 : styles.showtext1}>
          <div className={styles.word1}>
            Share your data with
            <div className={styles.word2}> BNP Paribas</div>
          </div>
        </div>
      </div>
      <BlueBtnCard />

      <LandingTextBox />

      {/* <Grid container spacing={3}>
        <ShareEmployementCard />

      </Grid> */}

      <div style={style2.miniBox}>
        <button
          type="button"
          className={isLoggedIn ? styles.shownothing : styles.button}
          onClick={handleClick}
        >
          <div className={styles.buttontext}>Continue</div>
        </button>
      </div>

      <div className={styles.footer}>
        <div className={isLoggedIn ? styles.shownothing : styles.text5}>
          Project Oak is a governmental initiative that allows you to store and
          transfer digital information between public and private
          organtisations.
        </div>
      </div>
    </div>
  );
}

export default RedirectPage;
