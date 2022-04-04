/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export type TabsState = {
  tab: 'inbox' | 'consent' | 'mydata';
};

const initialState = {
  tab: 'inbox',
} as TabsState;

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    selectTab: (state, newTab) => {
      state.tab = newTab.payload;
    },
  },
});

const { reducer } = tabsSlice;
export default reducer;
export const { selectTab } = tabsSlice.actions;
