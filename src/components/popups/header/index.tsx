import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetched } from '../../../slices/requestSlice';
import { RootState } from '../../../store';
import { ExitRow } from '../button/utils';
import {
  reviewGetdataTitle1, reviewGetdataTitle2, checkGetdataTitle1, checkGetdataTitle2, reviewSharedataTitle1,
  reviewSharedataTitle2, checkSharedataTitle1, checkSharedataTitle2,
} from '../document';
import { finish, restart } from '../popupSlice';
import style from './index.module.css';
import { Title, SubTitle } from './utils';

function Header() {
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
    <div className={style.headerBox}>

      {(requestState === 'gotData' && popupState === 'agree')
      && (
      <ExitRow label="close" onPress={() => dispatch(finish())} />
      )}
      {(requestState === 'fetching' && popupState === 'review') && <Title title={reviewGetdataTitle1} />}
      {(requestState === 'fetching' && popupState === 'review') && <SubTitle title={reviewGetdataTitle2} />}
      {(requestState === 'fetching' && (popupState === 'check' || popupState === 'agree')) && <Title title={checkGetdataTitle1} />}
      {(requestState === 'fetching' && (popupState === 'check' || popupState === 'agree')) && <SubTitle title={checkGetdataTitle2} />}
      {(requestState === 'sharing' && popupState === 'review') && <Title title={reviewSharedataTitle1} />}
      {(requestState === 'sharing' && popupState === 'review') && <SubTitle title={reviewSharedataTitle2} />}
      {(requestState === 'sharing' && (popupState === 'check' || popupState === 'agree')) && <Title title={checkSharedataTitle1} />}
      {(requestState === 'sharing' && (popupState === 'check' || popupState === 'agree')) && <SubTitle title={checkSharedataTitle2} />}
    </div>
  );
}

export default Header;
