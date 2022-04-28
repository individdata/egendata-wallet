/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export type PopupState = {
  step: 'review' | 'check' | 'agree' | 'result' | 'finished';
};

const initialState = {
  step: 'review',
} as PopupState;

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    restart: (state) => {
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
  review, restart, check, agree, finish,
} = popupSlice.actions;
