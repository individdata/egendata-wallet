import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setPopupData } from '../../../slices/popupSlice';
import styles from './FetchInProgress.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';
import { RootState } from '../../../store';
import FetchingBar from '../../fetchingBar';

type Props = {
  requestId: string,
};

function FetchInProgress(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();
  const request = useSelector((state: RootState) => state.requests[requestId]);

  useEffect(() => {
    if (request) {
      dispatch(setPopupData({
        component: 'FetchComplete',
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
        <FetchingBar label="Fetching data..." />
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default FetchInProgress;
