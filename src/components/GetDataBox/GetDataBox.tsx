import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../state/reducers';
import styles from './GetDataBox.module.css';
import { flowAction } from '../../state/index';

function TransferBox() {
  const flowState = useSelector((state: State) => state.flow);
  const [checked, setChecked] = React.useState(false);

  const handleChange = (c: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(c.target.checked);
  };
  const dispatch = useDispatch();
  const { getdata } = bindActionCreators(flowAction, dispatch);
  let transferBoxState;
  if (flowState === 'consented') {
    transferBoxState = styles.transferbox1;
  } else if (flowState === 'getdata' || flowState === 'sharedata') {
    transferBoxState = styles.transferbox2;
  } else {
    transferBoxState = styles.transferbox3;
  }
  console.log('1', transferBoxState);
  return (
    <div className={transferBoxState}>
      <div className={styles.box}>
        <div className={styles.firstLine}>
          <img className={styles.one} alt="logo" />
          <div className={styles.text}>
            Transfer data from Arbetsförmedlingen
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
          <img className={styles.af} alt="logo" />
          <div className={styles.aftitle}>Arbetsförmedlingen</div>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={checked}
            onChange={handleChange}
          />
          <div className={styles.consentedtext}>Gonsent to get data</div>
          <button
            className={(checked) ? styles.button1 : styles.button2}
            disabled={(!checked)}
            type="button"
            onClick={() => getdata(flowState)}
          >
            <div className={(checked) ? styles.buttontext1 : styles.buttontext2}>
              Get data
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransferBox;
