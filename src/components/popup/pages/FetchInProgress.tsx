/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setPopupData } from '../../../slices/popupSlice';
import styles from './FetchInProgress.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';
import { RootState } from '../../../store';
import FetchingBar from '../../fetchingBar';
import useTimeout from '../../../hooks/useTimeout';

type Props = {
  requestId: string,
};

function FetchInProgress(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();
  // const request = useSelector((state: RootState) => state.requests[requestId]);
  const requestState = useSelector((state: RootState) => state.process[requestId].state);

  const expired = useTimeout(5000);

  useEffect(() => {
    if (requestState === 'available') {
      dispatch(setPopupData({
        component: 'FetchComplete',
        props: {
          requestId,
        },
      }));
    }
  }, [requestState]);

  useEffect(() => {
    if (expired) {
      dispatch(setPopupData({
        component: 'FetchTimeout',
        props: {
          requestId,
        },
      }));
    }
  }, [expired]);

  return (
    <div className={styles.container}>
      <PopupContent>
        <FetchingBar id="popup_fetch_data_text" />
      </PopupContent>
      <PopupButtons buttons={[]} />
    </div>
  );
}

export default FetchInProgress;
