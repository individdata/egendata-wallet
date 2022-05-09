/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  login,
  logout,
  handleIncomingRedirect,
} from '@inrupt/solid-client-authn-browser';
import { AuthorizedUser } from '../pages/auth/types';
import config from '../util/config';
import { fetchProfileData, fetchSsnData } from '../util/oak/solid';
import { subscribe, unsubscribe } from './notificationSlice';
import { resetRequests } from './requestsSlice';

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
  async (id, { dispatch }) => {
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

type AuthState = {
  status: 'authorizing' | 'handleredirect' | 'handlingredirect' | 'loggedin' | 'error' | 'idle' | 'unauthorizing';
  error: string | null;
  user: AuthorizedUser | undefined;
  redirect: boolean;
  redirectPath: string;
};

const initialState = {
  status: 'idle',
  error: null,
  user: undefined,
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
