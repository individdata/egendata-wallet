import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { PopupButton, unsetPopupData } from '../../../slices/popup2Slice';
import styles from './FetchComplete.module.css';
import PopupButtons from '../PopupButtons';
import PopupContent from '../PopupContent';
import { successGetdata } from '../../popups/document';

type Props = {
  requestId: string,
};

function FetchComplete(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { requestId } = props;

  const dispatch = useDispatch();

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: 'primary',
      label: 'Close',
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
          {successGetdata}
        </div>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default FetchComplete;
