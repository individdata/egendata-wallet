import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { share } from '../../pages/direct/requestSlice';
import styles from './index.module.css';
import { DataRequest } from '../../pages/direct/inbox';

function ShareDataBox(props: DataRequest) {
  /* subject, requestedData, requestedFrom, requestedBy, */
  const {
    id,
  } = props;
  const requestState = useSelector((state: RootState) => state.requests.find((request) => request.id === id));
  const [checked, setChecked] = React.useState(false);

  const handleChange = (c: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(c.target.checked);
  };
  const dispatch = useDispatch();
  /* need to change */
  const personnumber = '19881202-1234';
  const employmentstatus = 'unemployed';

  let getDataState;
  if (requestState?.status === 'gotData') {
    getDataState = styles.transferbox1;
  } else if (requestState?.status === 'sharedData' || requestState?.status === 'consenting') {
    getDataState = styles.transferbox2;
  } else {
    getDataState = styles.transferbox3;
  }

  return (
    <div className={getDataState}>
      <div className={styles.box}>
        <div className={styles.firstLine}>
          <img className={styles.one} alt="logo" />
          <div className={styles.text}>
            Review and share data with receiver
          </div>
        </div>
        <hr className={styles.line} />
        <div className={styles.secondline}>
          <div className={styles.secondtext}>
            <div className={styles.personnumber}>
              Personal ID number:
              <div className={(requestState?.status === 'gotData' || requestState?.status === 'sharedData') ? styles.persontext1 : styles.persontext2}>
                {personnumber}
              </div>
            </div>
            <div className={styles.employmentstatus}>
              Employment status:
              <div className={(requestState?.status === 'gotData' || requestState?.status === 'sharedData') ? styles.employtext1 : styles.employtext2}>
                {employmentstatus}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.thirdline}>
          <div className={styles.firstItem}>
            <img className={styles.af} alt="logo" />
            <div className={styles.aftitle}>requester</div>
          </div>
          <div className={styles.secondItem}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={checked}
              onChange={handleChange}
            />
          </div>
          <div className={styles.thirdItem}>
            <div className={styles.consentedtext}>Gonsent to share</div>
          </div>
          <div className={styles.fourthItem}>
            <button
              className={(checked) ? styles.button1 : styles.button2}
              disabled={(!checked)}
              type="button"
              onClick={() => dispatch(share(id))}
            >
              <div className={(checked) ? styles.buttontext1 : styles.buttontext2}>
                Share data
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareDataBox;
