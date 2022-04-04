/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { DataRequest, DataResponse, inboxContent } from './fetchrequests';

export type FlowState = {
  flow: 'uncheck' | 'checking' | 'consenting' | 'fetched' | 'shared';
  error: string | null;
  content: Array<DataRequest | DataResponse>;
};

const initialState = {
  flow: 'uncheck',
  error: null,
  content: [],
} as FlowState;

export const getInboxContent = createAsyncThunk<Array<DataRequest | DataResponse>> (
  'inbox/getInboxContent',
  async (id, { getState }): Promise<DataRequest[]> => {
    const state = getState() as RootState;
    const inboxUrl = state.auth.user?.storage + "oak/inbox/";
    return inboxContent(inboxUrl);
  },
);

export const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    consent: (state, current) => {
      state.flow = current.payload;
    },
  },
});

const { reducer } = flowSlice;
export default reducer;
export const { consent } = flowSlice.actions;
