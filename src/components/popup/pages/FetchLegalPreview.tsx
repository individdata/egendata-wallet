/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setPopupData } from '../../../slices/popupSlice';
import styles from './FetchLegalPreview.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';
import PopupHeader from '../PopupHeader';
import { checkGetdataCheckInfo, checkGetdataInfo } from '../../../util/document';
import Checkbox from '../../ui/Checkbox';
import { createOutboundDataRequest } from '../../../slices/requestsSlice';

type Props = {
  requestId: string,
};

function FetchLegalPreview(props: Props) {
  const { requestId } = props;

  const dispatch = useDispatch();

  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: 'primary',
      label: 'Consent and get data',
      disabled: !(checkbox1 && checkbox2 && checkbox3),
      onPress: () => {
        dispatch(createOutboundDataRequest(requestId));
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
        title="Consent document transfer"
        subtitle="You are about to fetch your Unemployment certificate from Arbetsförmedlingen."
      />
      <PopupContent>
        <p>{checkGetdataInfo}</p>
        <Checkbox label={checkGetdataCheckInfo[0]} onChange={(evt) => setCheckbox1(evt.target.checked)} />
        <Checkbox label={checkGetdataCheckInfo[1]} onChange={(evt) => setCheckbox2(evt.target.checked)} />
        <Checkbox label={checkGetdataCheckInfo[2]} onChange={(evt) => setCheckbox3(evt.target.checked)} />
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default FetchLegalPreview;
