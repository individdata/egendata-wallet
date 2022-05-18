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
    changeLang: (state) => {
      if (state.lang === 'en') {
        state.lang = 'sv';
      } else {
        state.lang = 'en';
      }
    },
  },
});

const { reducer } = langSlice;
export default reducer;
export const { changeLang } = langSlice.actions;
