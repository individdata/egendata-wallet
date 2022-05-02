/* eslint-disable */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { InboundDataRequest, OutboundDataRequest, storeInboundDataResponse, storeInboundDataResponseAcl, storeInboundRequest, storeOutboundRequest, storeOutboundRequestLink } from '../../util/oak/datarequest';
import { requestsContent } from './requests';

// export type InboxContent = string[];

type RequestState = {
  status: 'idle' | 'storingInboundRequest' | 'creatingOutboundRequest' | 'fetching' | 'consenting' | 'gotData' | 'gotShareInfo' | 'sharedData' | 'sharing' | 'loading' ;
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

export const createOutboundDataRequest = createAsyncThunk<void, string>(
  'request/createOutboundDataRequest',
  async (id, { getState }): Promise<void> => { 
    const state = getState() as RootState;
    const { user } = state.auth;
    const request = state.requests[id].content;
    const sourcePod: string = 'https://oak-pod-provider-oak-develop.test.services.jtech.se/source/'; // the value have to be fetched from the sources profile!!!
    const userWebId: string = user!.webid;
    const sourceWebId: string = request.providerWebId;
  
    const data: OutboundDataRequest = {
      id,
      documentType: '',
      dataSubjectIdentifier: user!.id,
    }
    if (user && user.storage) {
      const userPod = user.storage;
      await Promise.all([
        storeOutboundRequest(userPod, data),
        storeInboundDataResponse(id, userPod),
        storeInboundDataResponseAcl(id, userPod, userWebId, sourceWebId),
        storeOutboundRequestLink(id, userPod, sourcePod),
      ]);
    };
 },
);

export const getRequestsContent = createAsyncThunk<InboundDataRequest[]>(
  'requests/getRequestsContent',
  async (id, { getState }): Promise<InboundDataRequest[]> => { 
    const state = getState() as RootState;
    const requestsUrl = state.auth.user?.storage + "oak/requests/";
    // console.log('requestsUrl:', requestsUrl);
    const content = await requestsContent(requestsUrl);
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
    add: (state, currentrequest) => {
      const request = currentrequest.payload as InboundDataRequest;
      state[request.id] = {
        content: request,
        error: null,
        status: 'idle',
      };
    },
    fetch: (state, currentrequest) => {
      /* for temporary test */
      const item = state[currentrequest.payload];
      item.status = 'fetching';
    },
    fetched: (state, currentrequest) => {
      const item = state[currentrequest.payload];
      item.status = 'gotData';
    },
    share: (state, currentrequest) => {
      const item = state[currentrequest.payload];
      item.status = 'sharing';
    },
    shared: (state, currentrequest) => {
      const item = state[currentrequest.payload];
      item.status = 'sharedData';
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getRequestsContent.pending, (state) => {
      for (const itemKey of Object.keys(state)) {
        const item = state[itemKey];
        item.status = 'loading';
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
    builder.addCase(createOutboundDataRequest.pending, (state, action) => {
      const itemKey = action.meta.arg;
      const item = state[itemKey];
      item.status = 'creatingOutboundRequest';
    });

    builder.addCase(createOutboundDataRequest.fulfilled, (state, action) => {
      const itemKey = action.meta.arg;
      const item = state[itemKey];
      item.status = 'fetching';
    });
  },
});

export const {
  resetRequests, inbox, add, fetch, fetched, share, shared,
} = requestSlice.actions;

const { reducer } = requestSlice;
export default reducer;
