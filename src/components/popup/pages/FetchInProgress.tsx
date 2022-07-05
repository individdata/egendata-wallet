/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { setPopupData } from '../../../slices/popupSlice';
import styles from './FetchInProgress.module.css';
import PopupButtons from '../PopupButtons';
import PopupContent from '../PopupContent';
import { RootState } from '../../../store';
import ActivityIndicator from '../../ui/ActivityIndicator';
import useTimeout from '../../../hooks/useTimeout';

type Props = {
  requestId: string,
};

function FetchInProgress(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.items[requestId]);
  const intl = useIntl();

  const expired = useTimeout(5000);

  useEffect(() => {
    if (data && data.document) {
      dispatch(setPopupData({
        component: 'FetchComplete',
        props: {
          requestId,
        },
      }));
    }
  }, [data]);

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
        <ActivityIndicator text={intl.formatMessage({ id: 'popup_fetch_data_text' })} />
      </PopupContent>
      <PopupButtons buttons={[]} />
    </div>
  );
}

export default FetchInProgress;
