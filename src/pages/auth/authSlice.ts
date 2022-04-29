/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  doLogin, afterLogin, doLogout,
} from '../../util/oak/login';
import { AuthorizedUser } from './types';

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
