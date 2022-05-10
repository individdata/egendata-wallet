import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { PopupButton, unsetPopupData } from '../../../slices/popup2Slice';
import styles from './ShareComplete.module.css';
import PopupButtons from '../PopupButtons';
import PopupContent from '../PopupContent';

type Props = {
  requestId: string,
};

function ShareComplete(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { requestId } = props;

  const dispatch = useDispatch();

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: 'primary',
      label: 'Return to requesting service',
      onPress: () => {
        dispatch(unsetPopupData());
      },
    },
  ];

  return (
    <div className={styles.container}>
      <PopupContent>
        <div className={styles.content}>
          <img className={styles.logoSuccess} alt="Success logo" />
          <div className={styles.titleText}>
            Your unemployement certificate is now being shared with BNP Paribas.
          </div>
          <div className={styles.noteText}>
            You can always revoke your consent under Consents.
          </div>
          <div className={styles.ctaText}>
            Stay up to date on all your data matters.
          </div>
          <div className={styles.noteText}>
            Just enter your Email address
          </div>
          <div>
            <input type="text" placeholder="example@email.com" />
          </div>
          <div>
            <input type="text" placeholder="telephone number" />
          </div>
        </div>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default ShareComplete;
