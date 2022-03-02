import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../state/reducers';
import styles from './ShareDataBox.module.css';
import { flowAction } from '../../state/index';

export interface RequestType {
  name: string,
  brief: string,
  date: string,
  content: string,
  readstatus: boolean
}

function ShareDataBox(props: RequestType) {
  const { name } = props;
  const flowState = useSelector((state: State) => state.flow);
  const [checked, setChecked] = React.useState(false);

  const handleChange = (c: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(c.target.checked);
  };
  const dispatch = useDispatch();
  const { getdata } = bindActionCreators(flowAction, dispatch);

  const personnumber = '19881202-1234';
  const employmentstatus = 'unemployed';
  let getDataState;
  if (flowState === 'getdata') {
    getDataState = styles.transferbox1;
  } else if (flowState === 'sharedata' || flowState === 'consented') {
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
              <div className={(flowState === 'getdata' || flowState === 'sharedata') ? styles.persontext1 : styles.persontext2}>{personnumber}</div>
            </div>
            <div className={styles.employmentstatus}>
              Employment status:
              <div className={(flowState === 'getdata' || flowState === 'sharedata') ? styles.employtext1 : styles.employtext2}>{employmentstatus}</div>
            </div>
          </div>
        </div>
        <div className={styles.thirdline}>
          <img className={styles.af} alt="logo" />
          <div className={styles.aftitle}>{name}</div>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={checked}
            onChange={handleChange}
          />
          <div className={styles.consentedtext}>Gonsent to share</div>
          <button
            className={(checked) ? styles.button1 : styles.button2}
            disabled={(!checked)}
            type="button"
            onClick={() => getdata(flowState)}
          >
            <div className={(checked) ? styles.buttontext1 : styles.buttontext2}>
              Share data
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareDataBox;
