/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  login,
  logout,
  handleIncomingRedirect,
} from '@inrupt/solid-client-authn-browser';
import { AuthorizedUser } from '../pages/AuthPage/types';
import config from '../util/config';
import { fetchProfileData, fetchSsnData } from '../util/oak/solid';
import {
  handleInboxNotification, handleRequestsNotification, subscribe, unsubscribeAll,
} from './notificationSlice';
import { resetRequests } from './requestsSlice';
import { inboxPath, subjectRequestsPath } from '../util/oak/egendata';

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

export const afterLogin = createAsyncThunk<AuthorizedUser>(
  'auth/afterlogin',
  async (id, { dispatch }) => {
    console.log('afterlogin');
    const userInfo = await handleIncomingRedirect();
    console.log('afterlogin111');
    const webId = userInfo?.webId ? userInfo.webId : '';
    console.log('afterLogin webId=', webId);
    if (!webId) {
      return {};
    }

    const profileData = await fetchProfileData(webId);
    if (profileData) {
      console.log('matched');
      const u = profileData as ProfileData;
      console.log('matched userInfo=', userInfo);
      const ssnData = await fetchSsnData(u.seeAlso);
      console.log('ssnData=', userInfo);
      if (ssnData) {
        console.log('matched seeAlso=', ssnData);
        const ssn = ssnData.ssn as string;
        const fullname = ssnData.fullname as string;
        console.log('matched ssn=', ssn);
        const authorizedUser: AuthorizedUser = {
          webid: userInfo?.webId ? userInfo.webId : '',
          name: fullname ?? 'Name',
          storage: u.storage ?? '',
          id: ssn,
          completed: true,
        };
        console.log('dispatch(subscribe())');

        const { storage } = authorizedUser;
        if (storage) {
          const inboxUrl = `${storage}${inboxPath}`;
          dispatch(subscribe({ topic: inboxUrl, onMessage: handleInboxNotification }));
          const requestsUrl = `${storage}${subjectRequestsPath}`;
          dispatch(subscribe({ topic: requestsUrl, onMessage: handleRequestsNotification }));
        }
        return authorizedUser;
      }
      return {};
    }
    return {};
  },
);

export const doLogout = createAsyncThunk<AuthorizedUser>(
  'auth/logout',
  async (id, { dispatch }) => {
    console.log('doLogout');
    await logout();
    dispatch(resetRequests());
    dispatch(unsubscribeAll());
    return {};
  },
);

type AuthState = {
  status: 'authorizing' | 'handleredirect' | 'handlingredirect' | 'loggedin' | 'error' | 'idle' | 'unauthorizing';
  error: string | null;
  user: AuthorizedUser;
  redirect: boolean;
  redirectPath: string;
};

const initialState = {
  status: 'idle',
  error: null,
  user: {},
  redirect: false,
  redirectPath: '/',
} as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(doLogin.pending, (state) => {
      state.status = 'authorizing';
      state.error = null;
    });

    builder.addCase(
      doLogin.fulfilled,
      (state, { payload }) => {
        state.status = 'handleredirect';
        state.redirectPath = payload;
      },
    );

    // When a server responses with an error:
    builder.addCase(
      doLogin.rejected,
      (state, { payload }) => {
        if (payload) state.error = payload as string;
        state.status = 'error';
      },
    );

    builder.addCase(afterLogin.pending, (state) => {
      state.status = 'handlingredirect';
      state.error = null;
    });

    builder.addCase(
      afterLogin.fulfilled,
      (state, { payload }) => {
        state.status = 'loggedin';
        state.user = payload;
      },
    );
    builder.addCase(doLogout.pending, (state) => {
      state.status = 'unauthorizing';
    });
    builder.addCase(doLogout.fulfilled, (state, { payload }) => {
      state.status = 'idle';
      state.error = null;
      state.user = payload;
    });
  },
});

const { reducer } = authSlice;
// export const { save } = actions;
export default reducer;
