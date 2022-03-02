import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import styles from './CertificateBox.module.css';
import { flowAction } from '../../state/index';
import { State } from '../../state/reducers';

function CertificateBox() {
  const authState = useSelector((state: State) => state.auth);
  const flowState = useSelector((state: State) => state.flow);
  const dispatch = useDispatch();
  const { certificate } = bindActionCreators(flowAction, dispatch);

  return (
    <div className={(authState === 'login' && flowState === 'sharedata') ? styles.main1 : styles.main2}>
      <div className={styles.box}>
        <img className={styles.certificate} alt="logo" />
        <div className={styles.text}>
          Your unemployement certificat is now being shared with BNP Paribas.
        </div>
        <div className={styles.text2}>
          Your unemployement certificat is now being shared with BNP Paribas.
        </div>
        <button
          className={styles.button}
          type="button"
          onClick={() => certificate(flowState)}
        >
          <div className={styles.buttontext}>
            Return to requesting service
          </div>
        </button>
      </div>
    </div>
  );
}

export default CertificateBox;
