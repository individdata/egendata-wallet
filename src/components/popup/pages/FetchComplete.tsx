import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { unsetPopupData } from '../../../slices/popupSlice';
import styles from './FetchComplete.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';

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
          <img className={styles.logoSuccess} alt="Success logo" />
          <FormattedMessage id="popup_success_fetch_data_text" />
        </div>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default FetchComplete;
