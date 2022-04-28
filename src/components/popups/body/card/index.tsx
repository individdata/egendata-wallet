import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../../store';
import { Certificate, CheckInfo } from './utils';
import { reviewGetdataBoxItems, checkGetdataInfo } from '../../document';

function card() {
  const { id } = useParams();
  let requestState = 'null';
  if (id) {
    requestState = useSelector((state: RootState) => state.requests[id].status);
  }
  const popupState = useSelector((state: RootState) => state.popup.step);
  return (
    <div>
      {(requestState === 'fetching' && popupState === 'review') && <Certificate certificate={reviewGetdataBoxItems} />}
      {(requestState === 'fetching' && (popupState === 'check' || popupState === 'agree')) && <CheckInfo msg={checkGetdataInfo} />}
    </div>
  );
}

export default card;
