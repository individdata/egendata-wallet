/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

export type redirectState = {
  status: true | false;
};

const initialState = {
  status: false,
} as redirectState;

export const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    redirectUpdate: (state) => {
      state.status = true;
    },
  },
});

const { reducer } = redirectSlice;
export default reducer;
export const { redirectUpdate } = redirectSlice.actions;
