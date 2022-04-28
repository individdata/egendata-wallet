import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { RootState } from '../../../store';
import { ButtonGreen } from './utils';
import { review, check } from '../popupSlice';
import { reviewGetdataButtonText, checkGetdataButtonText } from '../document';

function ButtonBox() {
  const { id } = useParams();
  let requestState = 'null';
  if (id) {
    requestState = useSelector((state: RootState) => state.requests[id].status);
  }
  const popupState = useSelector((state: RootState) => state.popup.step);
  const dispatch = useDispatch();
  return (
    <Grid container>
      {(requestState === 'consenting' && popupState === 'review')
      && <ButtonGreen onPress={() => dispatch(review())} label={reviewGetdataButtonText} />}
      {(requestState === 'consenting' && popupState === 'check')
      && <ButtonGreen onPress={() => dispatch(check())} label={checkGetdataButtonText} />}
    </Grid>
  );
}

export default ButtonBox;
