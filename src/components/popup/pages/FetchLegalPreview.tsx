/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setPopupData } from '../../../slices/popupSlice';
import styles from './FetchLegalPreview.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';
import PopupHeader from '../PopupHeader';
import Checkbox from '../../ui/Checkbox';
// import { createOutboundDataRequest } from '../../../slices/requestsSlice';
import { consentFetch } from '../../../slices/processesSlice';
import { RootState } from '../../../store';

type Props = {
  requestId: string,
};

function FetchLegalPreview(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();
  const { providerWebId } = useSelector((state: RootState) => state.subjectRequests.items[requestId]);

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: 'primary',
      id: 'consent_and_get_data_button',
      disabled: !(checkbox1 && checkbox2 && checkbox3),
      onPress: () => {
        dispatch(consentFetch({
          requestId,
          providerWebId,
          consentDocument: 'consent text ...',
        }));
        dispatch(setPopupData({
          component: 'FetchInProgress',
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
        titleId="popup_consent_title"
        subtitleId="popup_consent_subtitle"
      />
      <PopupContent>
        <fieldset>
          <FormattedMessage id="popup_check_get_data_info_text" />
          <Checkbox id="popup_check_get_data_text_1" onChange={(evt) => setCheckbox1(evt.target.checked)} />
          <Checkbox id="popup_check_get_data_text_2" onChange={(evt) => setCheckbox2(evt.target.checked)} />
          <Checkbox id="popup_check_get_data_text_3" onChange={(evt) => setCheckbox3(evt.target.checked)} />
        </fieldset>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default FetchLegalPreview;
