import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ShareInProgress.module.css';
import PopupButtons from '../PopupButtons';
import PopupContent from '../PopupContent';
import { RootState } from '../../../store';
import FetchingBar from '../../fetchingBar';
import { setPopupData } from '../../../slices/popupSlice';

type Props = {
  requestId: string,
};

function ShareInProgress(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();
  const request = useSelector((state: RootState) => state.process[requestId]);

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

  return (
    <div className={styles.container}>
      <PopupContent>
        <FetchingBar id="popup_share_data_text" />
      </PopupContent>
      <PopupButtons buttons={[]} />
    </div>
  );
}

export default ShareInProgress;
