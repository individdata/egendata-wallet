/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export type PopupState = {
  step: 'idle' | 'review' | 'check' | 'agree' | 'result' | 'finished';
};

const initialState = {
  step: 'idle',
} as PopupState;

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    restart: (state) => {
      state.step = 'idle';
    },
    start: (state) => {
      state.step = 'review';
    },
    review: (state) => {
      state.step = 'check';
    },
    check: (state) => {
      state.step = 'agree';
    },
    agree: (state) => {
      state.step = 'result';
    },
    finish: (state) => {
      /* if successful otherwise do action rest */
      state.step = 'finished';
    },
  },
});

const { reducer } = popupSlice;
export default reducer;
export const {
  start, review, restart, check, agree, finish,
} = popupSlice.actions;
