/* eslint-disable import/prefer-default-export */
// import React from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
// import { redirectRoot } from '../../feature/auth/authSlice';
import { afterLogin } from './login';
import { RootState } from '../../../store';

export function HandleLogin() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  // console.log('code=', code);
  // const authState = useSelector((state: State) => state.auth);
  const dispatch = useDispatch();
  // const handleClick = () => dispatch(navigate('/'));
  if (code) {
    dispatch(afterLogin());
  }

  const authState = useSelector((state: RootState) => state.afterLogin);
  console.log('authState=', authState);
  if (authState.redirectRoot) {
    return <Navigate to="/" replace />;
  }
  return null;
}
