import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../../store';
import { ReviewInfoBox, CheckBox } from './utils';
import { reviewGetdataInfo, checkGetdataCheckInfo } from '../../document';

function info() {
  const { id } = useParams();
  let requestState = 'null';
  if (id) {
    requestState = useSelector((state: RootState) => state.requests[id].status);
  }
  const popupState = useSelector((state: RootState) => state.popup.step);

  return (
    <div>
      {(requestState === 'fetching' && popupState === 'review') && <ReviewInfoBox msg={reviewGetdataInfo} />}
      {(requestState === 'fetching' && (popupState === 'check' || popupState === 'agree')) && <CheckBox items={checkGetdataCheckInfo} />}
    </div>
  );
}

export default info;
