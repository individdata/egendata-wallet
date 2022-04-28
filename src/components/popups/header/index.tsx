import React from 'react';
// import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../store';
import {
  reviewGetdataTitle1, reviewGetdataTitle2, checkGetdataTitle1, checkGetdataTitle2,
} from '../document';
import { Title, SubTitle } from './utils';

function Header() {
  const { id } = useParams();
  let requestState = 'null';
  if (id) {
    requestState = useSelector((state: RootState) => state.requests[id].status);
  }
  const popupState = useSelector((state: RootState) => state.popup.step);
  return (
    <>
      {(requestState === 'consenting' && popupState === 'review') && <Title title={reviewGetdataTitle1} />}
      {(requestState === 'consenting' && popupState === 'review') && <SubTitle title={reviewGetdataTitle2} />}
      {(requestState === 'consenting' && popupState === 'check') && <Title title={checkGetdataTitle1} />}
      {(requestState === 'consenting' && popupState === 'check') && <SubTitle title={checkGetdataTitle2} />}
    </>
  );
}

export default Header;
