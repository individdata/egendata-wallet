import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ShareInProgress.module.css';
import PopupButtons from '../PopupButtons';
import PopupContent from '../PopupContent';
import FetchingBar from '../../fetchingBar';
import { setPopupData } from '../../../slices/popupSlice';
import { getProcessByRequestId } from '../../../util/oak/egendata';
import { RootState } from '../../../store';

type Props = {
  requestId: string,
};

function ShareInProgress(props: Props) {
  const { requestId } = props;
  const rootState = useSelector((state: RootState) => state);

  const dispatch = useDispatch();
  const request = getProcessByRequestId(rootState, requestId);

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
