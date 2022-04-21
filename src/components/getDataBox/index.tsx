import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { fetch, fetchInfo } from '../../pages/direct/requestSlice';
import styles from './index.module.css';
import { DataRequest } from '../../pages/direct/inbox';

function GetDataBox(props: DataRequest) {
  /* subject, requestedData, requestedFrom, requestedBy */
  const { id } = props;
  const requestState = useSelector((state: RootState) => state.requests.find((request) => request.id === id));
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch();
  const handleChange = (c: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(c.target.checked);
    dispatch(fetchInfo(id));
  };
  let transferBoxState;
  if (requestState?.status === 'consenting') {
    transferBoxState = styles.transferbox1;
  } else if (requestState?.status === 'gotData' || requestState?.status === 'sharedData') {
    transferBoxState = styles.transferbox2;
  } else {
    transferBoxState = styles.transferbox3;
  }
  return (
    <div className={transferBoxState}>
      <div className={styles.box}>
        <div className={styles.firstLine}>
          <img className={styles.one} alt="logo" />
          <div className={styles.text}>
            Transfer data from source
          </div>
        </div>
        <hr className={styles.line} />
        <div className={styles.secondline}>
          <div className={styles.secondtext}>
            <div className={styles.personnumber}>Personal ID number:</div>
            <div className={styles.employmentstatus}>Employment status:</div>
          </div>
        </div>
        <div className={styles.thirdline}>
          <div className={styles.firstItem}>
            <img className={styles.af} alt="logo" />
            <div className={styles.aftitle}>Source</div>
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
            <div className={styles.consentedtext}>Gonsent to get data</div>
          </div>
          <div className={styles.fourthItem}>
            <button
              className={(checked) ? styles.button1 : styles.button2}
              disabled={(!checked)}
              type="button"
              onClick={() => dispatch(fetch(id))}
            >
              <div className={(checked) ? styles.buttontext1 : styles.buttontext2}>
                Get data
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetDataBox;
