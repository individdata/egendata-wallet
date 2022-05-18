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
  const request = useSelector((state: RootState) => state.requests[requestId]);

  const expired = useTimeout(5000);

  useEffect(() => {
    if (request.status === 'gotData') {
      dispatch(setPopupData({
        component: 'FetchComplete',
        props: {
          requestId,
        },
      }));
    }
  }, [request]);

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

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: 'primary',
      id: 'continue_to_get_data_button',
      onPress: () => {
        dispatch(setPopupData({
          component: 'FetchLegalPreview',
          props: {
            requestId,
          },
        }));
      },
    },
  ];

  return (
    <div className={styles.container}>
      <PopupContent>
        <FetchingBar id="popup_fetch_data_text" />
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default FetchInProgress;
