import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setPopupData } from '../../../slices/popupSlice';
import styles from './FetchDetailPreview.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';
import PopupHeader from '../PopupHeader';
import { reviewGetdataBoxItems, reviewGetdataInfo } from '../../../util/document';
import Certificate from '../../certificate';

type Props = {
  requestId: string,
  providerWebId: string,
};

function FetchDetailPreview(props: Props) {
  const { requestId, providerWebId } = props;

  const dispatch = useDispatch();

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
            providerWebId,
          },
        }));
      },
    },
  ];

  return (
    <div className={styles.container}>
      <PopupHeader
        titleId="popup_consent_title"
        subtitleId="popup_consent_subtitle"
      />
      <PopupContent>
        <Certificate certificate={reviewGetdataBoxItems} />
        <p>{reviewGetdataInfo}</p>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default FetchDetailPreview;
