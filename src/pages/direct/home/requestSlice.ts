/* eslint-disable react/jsx-props-no-spreading */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../../store';
import { DataRequest, DataResponse, inboxContent } from './inbox';

export type InboxContent = string[];

type RequestState = {
  id: string;
  status: 'idle' | 'fetching' | 'selected' | 'unselected' | 'consenting' | 'gotData' | 'sharedData' ;
  error: string | null;
  content: DataRequest | DataResponse;
};

export const getInboxContent = createAsyncThunk<Array<DataRequest | DataResponse>>(
  'inbox/getInboxContent',
  async (id, { getState }): Promise<DataRequest[]> => { 
    const state = getState() as RootState;
    const inboxUrl = state.auth.user?.storage + "oak/inbox/";
    return inboxContent(inboxUrl);
  },
);

export const requestSlice = createSlice({
  name: 'auth',
  initialState: [] as RequestState[],
  reducers: {
    resetRequests: (state) => {
      /* do not work */
      state = [];
    },
    inbox: (state) => {
      for (const item of state) {
        item.status = 'idle';
      }
    },
    select: (state, currentrequest) => {
      for (const item of state) {
        if (item.id === currentrequest.payload) {
          item.status = 'selected';
        } else {
          item.status = 'unselected';
        }
      }
    },
    consent: (state, currentrequest) => {
      for (const item of state) {
        if (item.id === currentrequest.payload) {
          item.status = 'consenting';
        }
      }
    },
    fetch: (state, currentrequest) => {
      for (const item of state) {
        if (item.id === currentrequest.payload) {
          item.status = 'gotData';
        }
      }
    },
    share: (state, currentrequest) => {
      for (const item of state) {
        if (item.id === currentrequest.payload) {
          item.status = 'sharedData';
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getInboxContent.pending, (state) => {
      for (const item of state) {
        item.status = 'fetching';
        item.error = null;
      }
    });

    builder.addCase(getInboxContent.fulfilled, (state, action) => {
      const requestIds = new Set<string>();
      for (const item of state) {
        requestIds.add(item.id);
      }
      for (const request of action.payload) {
        if (requestIds.has(request.id) === false) {
          state.push({
            id: request.id,
            status: 'idle',
            error: null,
            content: request,
          });
        }
      }
    });
  },
});

export const {
  resetRequests, inbox, select, consent, fetch, share,
} = requestSlice.actions;

const { reducer } = requestSlice;
export default reducer;
