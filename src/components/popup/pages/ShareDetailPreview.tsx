import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setPopupData, unsetPopupData } from '../../../slices/popupSlice';
import styles from './ShareDetailPreview.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';
import PopupHeader from '../PopupHeader';
import {
  reviewGetdataButtonText2,
  reviewGetdataInfo,
  reviewShareButtonText,
  reviewSharedataTitle1,
  reviewSharedataTitle2,
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
      label: reviewShareButtonText,
      onPress: () => {
        dispatch(unsetPopupData());
      },
    },
    {
      uuid: uuid(),
      type: 'primary',
      label: reviewGetdataButtonText2,
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
        title={reviewSharedataTitle1}
        subtitle={reviewSharedataTitle2}
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
