import React from 'react';
import { useSelector } from 'react-redux';
import styles from './RedirectLoginPage.module.css';
import RedirectMainPage from '../RedirectMainPage/RedirectMainPage';
import LoginButton from '../../components/LoginButton/LoginButton';
import OakLogo from '../../components/OakLogo/OakLogo';
import { State } from '../../state/reducers';

function RedirectLoginPage(props: any) {
  const { redirect } = props;
  const authState = useSelector((state: State) => state.auth);
  return (
    <div>
      <div className={(authState === 'logout') ? styles.main1 : styles.main2}>
        <div className={styles.loginpage}>
          <div className={styles.firstline}>
            <OakLogo />
          </div>
          <div className={styles.secondline}>
            Your data in your control.
          </div>
          <div className={styles.thirdline}>
            Project Oak is a governmental initiative that allows you to store and transfer digital information between public and private organtisations.
          </div>
          <div className={styles.fourthline}>
            <div className={styles.fourthmain}>
              <div className={styles.fourthtitle}>
                BNP is requesting your unemployment certificate from Arbetsförmedlingen
              </div>
              <div className={styles.fourthcontent}>
                <div className={styles.from}>
                  <img className={styles.af} alt="logo" />
                  <div className={styles.fromtext}>
                    Arbetsförmedlingen
                  </div>
                </div>
                <div className={styles.middle}>
                  <img className={styles.shape} alt="logo" />
                </div>
                <div className={styles.to}>
                  <img className={styles.bnp} alt="logo" />
                  <div className={styles.fromtext}>
                    BNP Paribas
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.fifthline}>
            Before a transfer can be made you have to:
          </div>
          <div className={styles.sixline}>
            <div className={styles.firststep}>
              <img className={styles.one} alt="logo" />
              <div className={styles.content}>
                Sign up or Log in to Project OAK
              </div>
            </div>
            <div className={styles.secondstep}>
              <img className={styles.two} alt="logo" />
              <div className={styles.content}>
                Consent getting the data from Arbetsförmedlingen
              </div>
            </div>
            <div className={styles.thirdstep}>
              <img className={styles.one} alt="logo" />
              <div className={styles.content}>
                Review and consent sharing the data to BNP Paribas
              </div>
            </div>
          </div>
          <div className={styles.fifthline}>
            Identify yourself to continue
          </div>
          <div className={styles.lastline}>
            <LoginButton redirect={redirect} />
          </div>
        </div>
      </div>
      <div className={(authState === 'login') ? styles.main1 : styles.main2}>
        <RedirectMainPage />
      </div>
    </div>
  );
}

export default RedirectLoginPage;
