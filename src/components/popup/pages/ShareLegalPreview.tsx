import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { setPopupData, unsetPopupData } from '../../../slices/popupSlice';
import styles from './ShareLegalPreview.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';
import PopupHeader from '../PopupHeader';
import { checkGetdataCheckInfo, checkGetdataInfo } from '../../../util/document';
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
        title="Consent document transfer"
        subtitle="You are about to share your Unemployment certificate to BNP Paribas."
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

export default ShareLegalPreview;
