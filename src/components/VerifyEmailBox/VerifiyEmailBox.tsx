/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import validator from 'validator';
import { flowAction } from '../../state/index';
import { State } from '../../state/reducers';
import styles from './VerifyEmailBox.module.css';

export default function VerifiyEmailBox() {
  const [emailError, setEmailError] = useState('');
  const validateEmail = (e :React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError('valid');
    } else {
      setEmailError('Enter valid Email!');
    }
  };

  const authState = useSelector((state: State) => state.auth);
  const flowState = useSelector((state: State) => state.flow);
  const dispatch = useDispatch();
  const { certificate } = bindActionCreators(flowAction, dispatch);
  console.log('validate email', emailError);
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

        <div style={{ display: 'flex', flexDirection: 'row' }}>

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
              onChange={(e) => validateEmail(e)}
              placeholder="example@email.com"
              className={styles.inputField}
            />
          </form>
          <div style={{ textAlign: 'center', marginTop: '3%', marginLeft: '5%' }}>

            {emailError === 'Enter valid Email!'
            && (
            <span style={{
              fontWeight: 'bold',
              color: 'red',
            }}
            >
              {emailError}

            </span>
            )}

            { emailError === 'valid'
            && <img className={styles.valid} alt="logo" />}

          </div>
        </div>

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
