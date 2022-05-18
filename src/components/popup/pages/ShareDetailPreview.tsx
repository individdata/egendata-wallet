import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setPopupData, unsetPopupData } from '../../../slices/popupSlice';
import styles from './ShareDetailPreview.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';
import PopupHeader from '../PopupHeader';
import {
  reviewGetdataInfo,
  reviewShareddataBoxItems,
} from '../../../util/document';
import Certificate from '../../certificate';

type Props = {
  requestId: string,
};

function ShareDetailPreview(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: 'secondary',
      id: 'share_later_button',
      onPress: () => {
        dispatch(unsetPopupData());
      },
    },
    {
      uuid: uuid(),
      type: 'primary',
      id: 'continue_to_share_data_button',
      onPress: () => {
        dispatch(setPopupData({
          component: 'ShareLegalPreview',
          props: {
            requestId,
          },
        }));
      },
    },
  ];

  return (
    <div className={styles.container}>
      <PopupHeader
        title_id="popup_review_share_data_title"
        subtitle_id="popup_review_share_data_subtitle"
      />
      <PopupContent>
        <Certificate certificate={reviewShareddataBoxItems} />
        <p>{reviewGetdataInfo}</p>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default ShareDetailPreview;
