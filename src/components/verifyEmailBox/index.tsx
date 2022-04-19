/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { RootState } from '../../store';
import { share } from '../../pages/direct/home/requestSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import validator from 'validator';
import styles from './index.module.css';
import { DataRequest } from '../../pages/direct/home/inbox';

export default function VerifiyEmailBox(props: DataRequest) {
  const [emailError, setEmailError] = useState('');
  const validateEmail = (e :React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError('valid');
    } else {
      setEmailError('Enter valid Email!');
    }
  };

  const { id, subject, requestedData, requestedFrom, requestedBy } = props;
  const requestState = useSelector((state: RootState) => state.requests.find(request => request.id === id));
  const dispatch = useDispatch();
  console.log('validate email', emailError);
  return (
    <div className={
        requestState?.status === 'sharedData'
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
          onClick={() => dispatch(share(id))}
        >
          <div className={styles.buttontext}>Return to requesting service</div>
        </button>
      </div>
    </div>
  );
}
