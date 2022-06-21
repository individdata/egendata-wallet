/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { afterLogin } from '../../slices/authSlice';
import { RootState } from '../../store';
import { createOakContainers } from '../../util/oak/templates';
import { syncStateFromPod } from '../../slices/processesSlice';
// import { subjectRequestThunks } from '../../slices/requests/subjectRequestsSlice';
// import { providerRequestThunks } from '../../slices/requests/providerRequestsSlice';
// import { consumerConsentThunks } from '../../slices/consents/consumerConsentSlice';
// import { dataThunks } from '../../slices/dataSlice';
// import { providerConsentThunks } from '../../slices/consents/providerConsentSlice';

export function HandleLogin() {
  console.log('rendering HandleLogin');
  const user = useSelector((state: RootState) => state.auth.user);
  // const subjectRequests = useSelector((state: RootState) => state.subjectRequests);
  // const providerRequests = useSelector((state: RootState) => state.providerRequests);
  // const providerConsents = useSelector((state: RootState) => state.providerConsents);
  // const consumerConsents = useSelector((state: RootState) => state.consumerConsents);
  // const data = useSelector((state: RootState) => state.data);
  // const storage = useSelector((state: RootState) => state.auth.user?.storage);
  const isLoggedIn = Object.keys(user).length !== 0;
  //  const redirectPath = useSelector((state: RootState) => state.auth.redirectPath);

  const [redirect, setRedirect] = useState<boolean | string>(false);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('HandleLogin, dispatch(afterLogin()) ');
    dispatch(afterLogin());
  }, []);

  useEffect(() => {
    console.log('HandleLogin user = ', user);
    if (isLoggedIn) {
      if (user.storage && !user.egendataDefined) {
        createOakContainers(user.webid, user.storage);
      }

      if (user) {
        dispatch(syncStateFromPod(user.storage));
      }

      const redirectPath = localStorage.getItem('redirectPath');
      if (redirectPath) {
        console.log('setRedirect, redirectPath = ', redirectPath);
        setRedirect(redirectPath);
      }
      console.log(redirectPath);
      // setRedirect("/consent?a=b");
    }
  }, [user]);

  if (redirect && typeof (redirect) === 'string') {
    console.log('Navigate redirect, redirect = ', redirect);
    return <Navigate to={redirect} replace />;
  }
  return null;
}
