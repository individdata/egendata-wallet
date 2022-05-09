/* eslint-disable */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { finish } from './popupSlice';

import { RootState } from '../store';
import { InboundDataRequest, OutboundDataRequest, createInboundDataResponse, storeInboundDataResponseAcl, storeInboundRequest, storeOutboundDataRequestAcl, storeOutboundRequest, storeOutboundRequestLink, storeOutboundResponseLink } from '../util/oak/templates';
import { DataResponse } from '../util/oak/egendata';
import { fetchProfileData } from '../util/oak/solid';
import { requestsContent } from '../util/oak/requests';

// export type InboxContent = string[];

type RequestState = {
  status: 'idle' | 'storingInboundRequest' | 'creatingOutboundRequest' | 'fetching' | 'consenting' | 'gotData' | 'gotShareInfo' | 'sharingData' | 'sharedData' | 'responseAvailable' | 'sharing' | 'loading' ;
  error: string | null;
  content: InboundDataRequest;
};

export type RequestsState = Record<string, RequestState>;

export const storeInboundDataRequest = createAsyncThunk<void, InboundDataRequest>(
  'requests/saveInboundDataRequest',
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
  'requests/createOutboundDataRequest',
  async (id, { getState }): Promise<void> => { 
    const state = getState() as RootState;
    const { user } = state.auth;
    const request = state.requests[id].content;
    const userWebId: string = user!.webid;
    const sourceWebId: string = request.providerWebId;
    const providerProfile = await fetchProfileData(sourceWebId);
    const providerPodStorage = providerProfile.storage;
  
    const data: OutboundDataRequest = {
      id,
      documentType: '',
      dataSubjectIdentifier: user!.id,
    }
    if (user && user.storage) {
      const userPod = user.storage;
      await Promise.all([
        storeOutboundRequest(userPod, data),
        storeOutboundDataRequestAcl(id, userPod, userWebId, sourceWebId),
        createInboundDataResponse(id, userPod),
        storeInboundDataResponseAcl(id, userPod, userWebId, sourceWebId),
        storeOutboundRequestLink(id, userPod, providerPodStorage),
      ]);
    };
 },
);

export const shareInboundDataResponse = createAsyncThunk<void, string>(
  'requests/shareInboundDataResponse',
  async (requestId, { getState, dispatch }): Promise<void> => {
    const state = getState() as RootState;
    const { user } = state.auth;
    if (user && user.storage) {
      const userPod = user.storage;
      const state = getState() as RootState;
      const request = state.requests[requestId].content;
      const sinkProfile = await fetchProfileData(request.requestorWebId);
      const sinkPod = sinkProfile.storage;
      await storeOutboundResponseLink(requestId, userPod, sinkPod);
      // also add requestor to the .acl fo the response!!
      dispatch(finish());
    }
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
      item.status = 'gotData';
    });

    builder.addCase(shareInboundDataResponse.pending, (state, action) => {
      const requestId = action.meta.arg;
      const item = state[requestId];
      item.status = 'sharingData';
    });

    builder.addCase(shareInboundDataResponse.fulfilled, (state, action) => {
      const requestId = action.meta.arg;
      const item = state[requestId];
      item.status = 'sharedData';
    });

  },
});

export const {
  resetRequests, inbox, add, fetch, fetched, share, shared,
} = requestSlice.actions;

const { reducer } = requestSlice;
export default reducer;
