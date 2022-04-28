/* eslint-disable */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { InboundDataRequest, OutboundDataRequest, storeInboundRequest, storeOutboundRequest, storeOutboundRequestLink } from '../../util/oak/datarequest';
import { requestContent } from './requests';

// export type InboxContent = string[];

type RequestState = {
  status: 'idle' | 'storingInboundRequest' | 'fetching' | 'consenting' | 'gotData' | 'gotShareInfo' | 'sharedData' ;
  error: string | null;
  content: InboundDataRequest;
};

export type RequestsState = Record<string, RequestState>;

export const storeInboundDataRequest = createAsyncThunk<void, InboundDataRequest>(
  'request/saveInboundDataRequest',
  async (request, { getState }): Promise<void> => { 
    const state = getState() as RootState;
    const { user } = state.auth;
    if (user && user.storage) {
      const userPod = user.storage;
      await storeInboundRequest(userPod, request);
    }
 },
);

export const createOutboundDataRequest = createAsyncThunk<void,
{
  id: string
  data: OutboundDataRequest
  sourcePod: string
}>(
  'request/saveInboundDataRequest',
  async (request, { getState }): Promise<void> => { 
    const state = getState() as RootState;
    const { user } = state.auth;
    if (user && user.storage) {
      const userPod = user.storage;
      /* we might call all these in parallell ... Promise.all ? */
      await storeOutboundRequest(userPod, request.data);
      await storeOutboundRequestLink(request.id, userPod, request.sourcePod);
      /* to be continued ... */
    }
 },
);

export const getRequestsContent = createAsyncThunk<InboundDataRequest[]>(
  'requests/getRequestsContent',
  async (id, { getState }): Promise<InboundDataRequest[]> => { 
    const state = getState() as RootState;
    const requestsUrl = state.auth.user?.storage + "oak/requests/";
    // console.log('requestsUrl:', requestsUrl);
    const content = await requestContent(requestsUrl);
    const filtered: InboundDataRequest[] = [];
    for (const item of content) {
      if (!item) continue;
      filtered.push(item);
    }
    return filtered;
  },
);

export const requestSlice = createSlice({
  name: 'requests',
  initialState: {} as RequestsState,
  reducers: {
    resetRequests: (state) => {
      /* do not work */
      state = {};
    },
    inbox: (state) => {
      for (const itemKey of Object.keys(state)) {
        const item = state[itemKey];
        item.status = 'idle';
      }
    },
    consent: (state, currentrequest) => {
      /* for temporary test */
      const item = state[currentrequest.payload];
      item.status = 'consenting';
    },
    fetch: (state, currentrequest) => {
      const item = state[currentrequest.payload];
      item.status = 'gotData';
    },
    share: (state, currentrequest) => {
      const item = state[currentrequest.payload];
      item.status = 'sharedData';
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getRequestsContent.pending, (state) => {
      for (const itemKey of Object.keys(state)) {
        const item = state[itemKey];
        item.status = 'fetching';
        item.error = null;
      }
    });

    builder.addCase(getRequestsContent.fulfilled, (state, action) => {
      for (const request of action.payload) {
        state[request.id] = {
          status: 'idle',
          error: null,
          content: request,
        };
      }
    });

    builder.addCase(storeInboundDataRequest.pending, (state) => {
      for (const itemKey of Object.keys(state)) {
        const item = state[itemKey];
        item.status = 'storingInboundRequest';
        item.error = null;
      }
    });

    builder.addCase(storeInboundDataRequest.fulfilled, (state, action) => {
    });
  },
});

export const {
  resetRequests, inbox, consent, fetch, share,
} = requestSlice.actions;

const { reducer } = requestSlice;
export default reducer;
