/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export type PopupData = {
  component: string,
  props: any,
};

export type PopupState = {
  popupData?: PopupData,
};

const initialState = {} as PopupState;

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    setPopupData: (state, { payload }) => {
      state.popupData = payload;
    },
    unsetPopupData: (state) => {
      state.popupData = undefined;
    },
  },
});

const { reducer } = popupSlice;

export default reducer;

export const {
  setPopupData,
  unsetPopupData,
} = popupSlice.actions;
