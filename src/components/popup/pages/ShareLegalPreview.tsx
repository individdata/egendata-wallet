import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setPopupData, unsetPopupData } from '../../../slices/popupSlice';
import styles from './ShareLegalPreview.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';
import PopupHeader from '../PopupHeader';
import Checkbox from '../../ui/Checkbox';
import { shareInboundDataResponse } from '../../../slices/requestsSlice';

type Props = {
  requestId: string,
};

function ShareLegalPreview(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

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
      id: 'next_button',
      disabled: !(checkbox1 && checkbox2 && checkbox3),
      onPress: () => {
        dispatch(shareInboundDataResponse(requestId));
        dispatch(setPopupData({
          component: 'ShareInProgress',
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
        title_id="popup_consent_title"
        subtitle_id="popup_consent_subtitle"
      />
      <PopupContent>
        <FormattedMessage id="popup_check_get_data_info_text" />
        <Checkbox id="popup_check_get_data_text_1" onChange={(evt) => setCheckbox1(evt.target.checked)} />
        <Checkbox id="popup_check_get_data_text_2" onChange={(evt) => setCheckbox2(evt.target.checked)} />
        <Checkbox id="popup_check_get_data_text_3" onChange={(evt) => setCheckbox3(evt.target.checked)} />
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default ShareLegalPreview;
