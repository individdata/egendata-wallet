/* eslint-disable max-len */
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../../store';
import {
  Certificate, CheckInfo, SuccessGetDataBox,
} from './utils';
import {
  reviewGetdataBoxItems, checkGetdataInfo, successGetdata, reviewShareddataBoxItems,
} from '../../document';

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
      {(requestState === 'fetching' && (popupState === 'result')) && <SuccessGetDataBox msg={successGetdata} />}
      {(requestState === 'sharing' && popupState === 'review') && <Certificate certificate={reviewShareddataBoxItems} />}
      {(requestState === 'sharing' && (popupState === 'result')) && <SuccessGetDataBox msg={successGetdata} />}

      {/* {(requestState === 'fetching' && popupState === 'review') && <MissingUnEmployementCert text1={MissingCertText1} text2={MissingCertText2} textP={MissingCertTextp} />} */}
      {/* {(requestState === 'fetching' && popupState === 'review') && <FetchingDataPopup msg={FetchingDataText} />} */}
      {/* {(requestState === 'sharing' && (popupState === 'check' || popupState === 'agree')) && <CheckInfo msg={cheGetdataInfo} />} */}
      {/* <GeneralInputEmail placeholder="example@email.com" /> */}
    </div>
  );
}

export default card;
