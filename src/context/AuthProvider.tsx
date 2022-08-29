import { handleIncomingRedirect, ISessionInfo } from '@inrupt/solid-client-authn-browser';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router';
import { useRouter, NextRouter } from 'next/router';
import { Buffer } from 'buffer';
import { v4 } from 'uuid';
import { setAuth } from '../store/slices/authSlice';
import { handleInboxNotification, handleRequestsNotification, subscribe } from '../store/slices/notificationSlice';
import { saveIncomingRequest, syncStateFromPod } from '../store/slices/processesSlice';
import { RootState } from '../store/store';
import { inboxPath, subjectRequestsPath } from '../util/oak/egendata';
import { fetchPrivateData, fetchProfileData } from '../util/oak/solid';

export const AuthContext = React.createContext({});

type Props = {
  children: React.ReactNode,
};

export function AuthProvider({ children }: Props) {
  
  const dispatch = useDispatch();
  const router: NextRouter = useRouter();
  const location = router.asPath;
  const user = useSelector((state: RootState) => state.auth.user);
  const [userinfo, setUserinfo] = useState<ISessionInfo | undefined>();

  useEffect(() => {
    const url = new URL(window.location.href);
    const request = url.searchParams.get('request');
    if (request) {
      localStorage.setItem('request', request);
      console.log('Saved incoming request to localStorage');
    }
  }, []);

  useEffect(() => {
    // if (location.pathname !== '/auth/cb') return;
    (async () => {
      setUserinfo(await handleIncomingRedirect());
    })();
  }, [location]);

  useEffect(() => {
    if (!user.storage) return;
    console.warn('Syncing state from pod');
    dispatch<any>(syncStateFromPod(user.storage));
  }, [user.storage]);

  useEffect(() => {
    (async () => {
      if (!userinfo) return;

      if (userinfo.isLoggedIn === false) {
        if (location.pathname !== '/') {
          console.log('navigate /');
          router.push('/');
        }
        return;
      }

      if (userinfo.isLoggedIn) {
        const { webId } = userinfo;
        if (!webId) throw new Error('No WebID found');
        const { storage, seeAlso } = await fetchProfileData(webId);
        const { ssn, fullname, uuid } = await fetchPrivateData(seeAlso);
        console.warn('Setting auth');
        dispatch(setAuth({
          webid: webId,
          name: fullname ?? 'Name',
          storage,
          id: ssn,
          uuid,
          completed: true,
          egendataDefined: true,
        }));

        const inboxUrl = `${storage}${inboxPath}`;
        dispatch<any>(subscribe({
          storage, topic: inboxUrl, uuid, onMessage: handleInboxNotification,
        }));
        const requestsUrl = `${storage}${subjectRequestsPath}`;
        dispatch<any>(subscribe({
          storage, topic: requestsUrl, uuid, onMessage: handleRequestsNotification,
        }));

        if (location.pathname === '/auth/cb') {
          const request = localStorage.getItem('request');
          const redirectPath = localStorage.getItem('redirectPath');
          if (request && redirectPath) {
            const decodedRequest = JSON.parse(Buffer.from(decodeURIComponent(request), 'base64').toString('utf8'));
            decodedRequest.id = v4();
            dispatch<any>(saveIncomingRequest(decodedRequest));
            console.log('navigate:', redirectPath);
            localStorage.removeItem('request');
            localStorage.removeItem('redirectPath');
            router.push(`/request/${decodedRequest.id}`);
            return;
          }
          console.log('navigate /home');
          router.push('/home');
        }
      }
    })();
  }, [userinfo]);

  return (
    <AuthContext.Provider value={false}>
      {children}
    </AuthContext.Provider>
  );
}
