/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import styles from './VerifyEmailBox.module.css';
import { flowAction } from '../../state/index';
import { State } from '../../state/reducers';

export default function VerifiyEmailBox() {
  const authState = useSelector((state: State) => state.auth);
  const flowState = useSelector((state: State) => state.flow);
  const dispatch = useDispatch();
  const { certificate } = bindActionCreators(flowAction, dispatch);
  return (
    <div className={
      authState === 'login' && flowState === 'sharedata'
        ? styles.main1
        : styles.main2
    }
    >
      <div className={styles.box}>
        <img className={styles.certificate} alt="logo" />
        <div className={styles.text4}>
          Your unemployement certificat is now
          being shared with BNP Paribas.
        </div>
        <div className={styles.text2}>
          You can always revoke your consent under Consents.
        </div>

        <div className={styles.text}>Do you want a copy by Email? </div>
        <p className={styles.text3}>Just enter your Email address</p>
        <form className={styles.form}>
          <FontAwesomeIcon
            icon={faEnvelope}
            fontSize="22"
            className={styles.emailIcon}
          />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="example@email.com"
            className={styles.inputField}
          />
        </form>
        <button
          className={styles.button}
          type="button"
          onClick={() => certificate(flowState)}
        >
          <div className={styles.buttontext}>Return to requesting service</div>
        </button>
      </div>
    </div>
  );
}
