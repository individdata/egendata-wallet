import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { RootState } from '../../../store';
import { ButtonGreen, ButtonDisable } from './utils';
import {
  review, check, agree, finish, restart,
} from '../popupSlice';
import { fetched } from '../../../pages/requests/requestSlice';
import {
  reviewGetdataButtonText, checkGetdataButtonText, finishGetdataButtonText,
} from '../document';

function ButtonBox() {
  const { id } = useParams();
  let requestState = 'null';
  if (id) {
    requestState = useSelector((state: RootState) => state.requests[id].status);
  }
  const popupState = useSelector((state: RootState) => state.popup.step);
  const dispatch = useDispatch();
  useEffect(() => {
    if (popupState === 'finished') {
      dispatch(dispatch(fetched(id)));
      dispatch(dispatch(restart()));
    }
  }, [popupState]);
  return (
    <Grid container>
      {(requestState === 'fetching' && popupState === 'review')
      && <ButtonGreen onPress={() => dispatch(review())} label={reviewGetdataButtonText} />}
      {(requestState === 'fetching' && popupState === 'check')
      && <ButtonDisable onPress={() => dispatch(check())} label={checkGetdataButtonText} />}
      {(requestState === 'fetching' && popupState === 'agree')
      && <ButtonGreen onPress={() => dispatch(agree())} label={checkGetdataButtonText} />}
      {(requestState === 'fetching' && popupState === 'result')
      && <ButtonGreen onPress={() => dispatch(finish())} label={finishGetdataButtonText} />}
    </Grid>
  );
}

export default ButtonBox;
