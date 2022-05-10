import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { PopupButton, setPopupData } from '../../../slices/popupSlice';
import styles from './ShareInProgress.module.css';
import PopupButtons from '../PopupButtons';
import PopupContent from '../PopupContent';
import { RootState } from '../../../store';
import FetchingBar from '../../fetchingBar';

type Props = {
  requestId: string,
};

function ShareInProgress(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();
  const request = useSelector((state: RootState) => state.requests[requestId]);

  useEffect(() => {
    if (request) {
      dispatch(setPopupData({
        component: 'ShareComplete',
        props: {
          requestId,
        },
      }));
    }
  }, [request]);

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: 'primary',
      label: 'Continue to get data',
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
        <FetchingBar label="Sharing data..." />
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default ShareInProgress;
