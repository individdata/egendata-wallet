/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  login, logout, getDefaultSession, handleIncomingRedirect, ISessionInfo,
} from '@inrupt/solid-client-authn-browser';
import {
  getSolidDataset, getThing, getStringNoLocale, Thing, getUrl,
} from '@inrupt/solid-client';
// import { useDispatch } from 'react-redux';
import { AuthorizedUser } from './types';
import { resetRequests, getInboxContent } from '../direct/requestSlice';

const sunetIdp = false;

const sunet = {
  oidcIssuer: 'https://solid-proxy.sunet.se',
  redirectUrl: `${window.location.href}auth/cb`,
  clientName: 'Digital Wallet',
  clientId: 'APP-6740D44B-CB41-4FAE-9485-13B0C7849D08',
};

const inrupt = {
  oidcIssuer: 'https://broker.pod.inrupt.com',
  clientName: 'Digital Wallet',
  redirectUrl: `${window.location.href}auth/cb`,
};

const css2 = {
  oidcIssuer: 'https://oak-pod-provider-oak-develop.test.services.jtech.se/',
  clientName: 'Digital Wallet',
  redirectUrl: `${window.location.origin}/auth/cb`,
};

const idp = css2;

export const doLogin = createAsyncThunk<string, string>(
  'auth/login',
  async (redirectPath) => {
    // login with solid auth client
    // console.log(`redirectUrl = ${idp.redirectUrl}`);
    localStorage.setItem('redirectPath', redirectPath);
    await login(idp);
    return redirectPath;
  },
);

export const afterLogin = createAsyncThunk<AuthorizedUser | undefined>(
  'auth/afterlogin',
  async (id, { getState, dispatch, requestId }) => {
    console.log('afterlogin');
    const userInfo = await handleIncomingRedirect();
    const webId = userInfo?.webId ? userInfo.webId : '';
    // console.log('afterLogin getState=', getState());
    // console.log('afterLogin requestId=', requestId);

    // console.log('afterLogin userInfo=', userInfo);
    // console.log('afterLogin webId=', webId);
    if (!webId) {
      return undefined;
    }
    const ds = await getSolidDataset(webId);
    const profile = getThing(ds, webId) as Thing;
    const name = getStringNoLocale(profile, 'http://xmlns.com/foaf/0.1/name');
    const storage = getUrl(profile, 'http://www.w3.org/ns/pim/space#storage');
    // console.log('name=', name);

    // console.log('storage=', storage);
    const authorizedUser: AuthorizedUser = {
      webid: userInfo?.webId ? userInfo.webId : '',
      name: name ?? 'Name',
      storage: storage ?? '',
      id: '',
      completed: true,
    };
    // console.log('afterLogin authorizedUser=', authorizedUser);
    if (userInfo?.isLoggedIn) {
      // console.log('dispatch(redirectRoot())');
      // dispatch(redirectRoot());
      /* re checke lina */
      // dispatch(getInboxContent());
    }
    return authorizedUser;
  },
);

export const doLogout = createAsyncThunk<undefined>(
  'auth/logout',
  async (id, { dispatch }) => {
    console.log('doLogout');
    await logout();
    dispatch(resetRequests());
    return undefined;
  },
);
