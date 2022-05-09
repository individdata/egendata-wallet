/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export type PopupButton = {
  uuid: string,
  label: string,
  onPress: () => void,
};

export type PopupData = {
  component: string,
  props: any,
};

export type PopupState = {
  popupData?: PopupData,
};

const initialState = {} as PopupState;

export const popup2Slice = createSlice({
  name: 'popup2',
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

const { reducer } = popup2Slice;

export default reducer;

export const {
  setPopupData,
  unsetPopupData,
} = popup2Slice.actions;
