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
};

function FetchDetailPreview(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();

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
      <PopupHeader
        title="Consent document transfer"
        subtitle="You are about to fetch your Unemployment certificate from Arbetsförmedlingen."
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
