import React from 'react';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { unsetPopupData } from '../../../store/slices/popupSlice';
import styles from './FetchComplete.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';

type Props = {
  requestId: string,
};

function FetchComplete(props: Props) {
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
          <Image className={styles.logoSuccess} alt="Success logo" src="/images/check-circle.png" width="27" height="40" />
          <FormattedMessage id="popup_success_fetch_data_text" />
        </div>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default FetchComplete;
