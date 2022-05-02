/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  login, logout, handleIncomingRedirect, fetch,
} from '@inrupt/solid-client-authn-browser';
import {
  getSolidDataset, getStringNoLocale, getThing, getUrl, Thing,
} from '@inrupt/solid-client';
import { AuthorizedUser } from '../../pages/auth/types';
import { resetRequests } from '../../pages/requests/requestSlice';
import { subscribe, unsubscribe } from './notificationSlice';
import { fetchProfileData, fetchSsnData } from './solid';
import config from '../config';

const idp = {
  oidcIssuer: config.idpBaseUrl,
  clientName: 'Digital Wallet',
  redirectUrl: `${window.location.origin}/auth/cb`,
};

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

export type ProfileData = {
  name: string;
  storage: string;
  seeAlso: string;
};

export const afterLogin = createAsyncThunk<AuthorizedUser | undefined>(
  'auth/afterlogin',
  async (id, { getState, dispatch, requestId }) => {
    console.log('afterlogin');
    const userInfo = await handleIncomingRedirect();
    const webId = userInfo?.webId ? userInfo.webId : '';
    console.log('afterLogin webId=', webId);
    if (!webId) {
      return undefined;
    }

    const profileData = await fetchProfileData(webId);
    if (profileData) {
      console.log('matched');
      const u = profileData as ProfileData;
      console.log('matched userInfo=', userInfo);
      const ssnData = await fetchSsnData(u.seeAlso);
      if (ssnData) {
        console.log('matched seeAlso=', ssnData);
        const ssn = ssnData as string;
        console.log('matched ssn=', ssn);
        const authorizedUser: AuthorizedUser = {
          webid: userInfo?.webId ? userInfo.webId : '',
          name: u.name ?? 'Name',
          storage: u.storage ?? '',
          id: ssn,
          completed: true,
        };
        console.log('dispatch(subscribe())');
        dispatch(subscribe(authorizedUser));
        return authorizedUser;
      }
      return undefined;
    }
    return undefined;
  },
);

export const doLogout = createAsyncThunk<undefined>(
  'auth/logout',
  async (id, { dispatch }) => {
    console.log('doLogout');
    await logout();
    dispatch(resetRequests());
    dispatch(unsubscribe());
    return undefined;
  },
);
