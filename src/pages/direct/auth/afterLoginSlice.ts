/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type AfterLoginState = {
  redirectRoot: boolean;
};

const initialState = {
  redirectRoot: false,
} as AfterLoginState;

export const afterLoginSlice = createSlice({
  name: 'afterLogin',
  initialState,
  reducers: {
    redirectRoot: (state) => {
      state.redirectRoot = true;
    },
  },
});

const { reducer } = afterLoginSlice;
export default reducer;
export const { redirectRoot } = afterLoginSlice.actions;
