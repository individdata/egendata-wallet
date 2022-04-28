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
import { AuthorizedUser } from './types';
import { resetRequests } from '../direct/requestSlice';
import { subscribe, unsubscribe } from '../../util/oak/notificationSlice';

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
  oidcIssuer: 'https://oak-identity-provider-oak-develop.test.services.jtech.se/',
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

export type ProfileData = {
  name: string;
  storage: string;
  seeAlso: string;
};

const fetchProfileData = async (webId: string) => {
  const ds = await getSolidDataset(webId);
  const profile = getThing(ds, webId) as Thing;
  const name = getStringNoLocale(profile, 'http://xmlns.com/foaf/0.1/name');
  const storage = getUrl(profile, 'http://www.w3.org/ns/pim/space#storage');
  const seeAlso = getUrl(profile, 'http://www.w3.org/2000/01/rdf-schema#seeAlso');
  return {
    name: name ?? '',
    storage: storage ?? '',
    seeAlso: seeAlso ?? '',
  };
};

const fetchSsnData = async (seeAlso: string) => {
  const ds1 = await getSolidDataset(`${seeAlso}`, { fetch });
  const privateMe = getThing(ds1, `${seeAlso}#me`) as Thing;
  const ssn = getStringNoLocale(privateMe, 'https://oak-pod-provider-oak-develop.test.services.jtech.se/schema/core/v1#dataSubjectIdentifier');
  return ssn ?? '';
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
