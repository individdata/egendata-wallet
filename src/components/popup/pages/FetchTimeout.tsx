/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { unsetPopupData } from '../../../slices/popupSlice';
import styles from './FetchTimeout.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';
// import { RootState } from '../../../store';

function FetchTimeout() {
  // const { requestId } = props;

  const dispatch = useDispatch();
  // const request = useSelector((state: RootState) => state.process[requestId]);

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: 'primary',
      id: 'close_button',
      onPress: () => {
        dispatch(unsetPopupData());
      },
    },
  ];

  return (
    <div className={styles.container}>
      <PopupContent>
        <div className={styles.content}>
          <FormattedMessage id="popup_under_proceed_text" />
        </div>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default FetchTimeout;
