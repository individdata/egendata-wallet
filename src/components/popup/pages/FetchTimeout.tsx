/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setPopupData, unsetPopupData } from '../../../slices/popupSlice';
import styles from './FetchTimeout.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';
import { RootState } from '../../../store';
import FetchingBar from '../../fetchingBar';
import useTimeout from '../../../hooks/useTimeout';

type Props = {
  requestId: string,
};

function FetchTimeout(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();
  const request = useSelector((state: RootState) => state.requests[requestId]);

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
          Your fetching is under proceed get notified when it&apos;s ready.
        </div>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default FetchTimeout;
