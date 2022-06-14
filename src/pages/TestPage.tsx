/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { subjectRequestThunks } from '../slices/requests/subjectRequestsSlice';
import styles from './TestPage.module.css';
import { doLogin } from '../slices/authSlice';

export function TestPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = user?.completed;
  const url = new URL(window.location.href);
  const currentPath = url.pathname + url.search;
  const storage = useSelector((state: RootState) => state.auth.user?.storage);

  const subjectRequestState = useSelector((state: RootState) => state.subjectRequests);

  useEffect(() => {
    if (user) {
      dispatch(subjectRequestThunks.getContent({ storage, currentResources: [] }));
    }
  }, [user]);
  const requests = subjectRequestState.items;
  const content = Object.keys(requests).map((requestKey) => {
    const request = requests[requestKey];
    return (
      <div key={requestKey}>
        <p>{request.id}</p>
        <p>{request.documentType}</p>
        <p>{request.providerWebId}</p>
        <p>{request.requestorWebId}</p>
        <p>{request.purpose}</p>
        <p>{request.returnUrl}</p>
      </div>
    );
  });
  return (
    <div className={styles.test}>
      <h1>Testpage</h1>
      {!isLoggedIn && <button onClick={() => dispatch(doLogin(currentPath))} id="login_button">Login</button>}
      <div>
        {content}
      </div>
    </div>
  );
}

export default TestPage;
