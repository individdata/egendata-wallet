/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

export type langState = {
  lang: 'en' | 'sv';
};

const initialState = {
  lang: 'sv',
} as langState;

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    selectLang: (state, newTab) => {
      state.lang = newTab.payload;
    },
  },
});

const { reducer } = langSlice;
export default reducer;
export const { selectLang } = langSlice.actions;
