/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { afterLogin } from '../../util/oak/login';
import { getRequestsContent } from '../requests/requestSlice';
import { RootState } from '../../store';
import { createOakContainers } from '../../util/oak/datarequest';

export function HandleLogin() {
  console.log('rendering HandleLogin');
  const user = useSelector((state: RootState) => state.auth.user);
  //  const redirectPath = useSelector((state: RootState) => state.auth.redirectPath);

  const [redirect, setRedirect] = useState<boolean | string>(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(afterLogin());
  });

  useEffect(() => {
    // console.log('user = ', user);
    if (user) {
      if (user.storage) {
        createOakContainers(user.webid, user.storage);
      }

      const redirectPath = localStorage.getItem('redirectPath');

      if (redirectPath) {
        // console.log('redirectPath = ', redirectPath);
        setRedirect(redirectPath);
      }
      // setRedirect("/consent?a=b");
    }
  }, [user]);

  useEffect(() => {
    dispatch(getRequestsContent());
  });

  if (redirect && typeof (redirect) === 'string') {
    return <Navigate to={redirect} replace />;
  }
  return null;
}
