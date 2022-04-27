/* eslint-disable */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { InboundDataRequest, inboundDataRequestTurtle, inboundDataRequestUrl } from '../../util/oak/datarequest';
import { requestContent } from './requests';
import { v4 as uuid } from 'uuid';
import { putFile } from '../../util/oak/solid';

// export type InboxContent = string[];

type RequestState = {
  status: 'idle' | 'storingInboundRequest' | 'fetching' | 'selected' | 'unselected' | 'consenting' | 'checkingFetchInfo' | 'gotData' | 'gotShareInfo' | 'sharedData' ;
  error: string | null;
  content: InboundDataRequest;
};

export type RequestsState = Record<string, RequestState>;

export const storeInboundDataRequest = createAsyncThunk<void, InboundDataRequest>(
  'request/saveInboundDataRequest',
  async (request, { getState }): Promise<void> => { 
    const state = getState() as RootState;
    const { user } = state.auth;
    if (user) {
      const userWebId = user.webid;
      const userPod = user.storage ?? userWebId;
      const requestUrl = inboundDataRequestUrl(userPod, request.id);
      const requestData = inboundDataRequestTurtle(
        request.id,
        request.requestorWebId,
        request.providerWebId,
        request.documentType,
        request.purpose,
        request.returnUrl,
        );
      await putFile(
        requestUrl,
        { body: requestData },
        "text/turtle",
      )
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
    select: (state, currentrequest) => {
      for (const itemKey of Object.keys(state)) {
        const item = state[itemKey];
        if (itemKey === currentrequest.payload) {
          item.status = 'selected';
        } else {
          item.status = 'unselected';
        }
      }
    },
    consent: (state, currentrequest) => {
      const item = state[currentrequest.payload];
      item.status = 'consenting';
    },
    fetchInfo: (state, currentrequest) => {
      const item = state[currentrequest.payload];
      item.status = 'checkingFetchInfo';
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
      console.log('222');
      for (const itemKey of Object.keys(state)) {
        const item = state[itemKey];
        item.status = 'fetching';
        item.error = null;
      }
    });

    builder.addCase(getRequestsContent.fulfilled, (state, action) => {
      console.log('111');
      for (const request of action.payload) {
        console.log('whwhhhhhh');
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
  resetRequests, inbox, select, consent, fetch, fetchInfo, share,
} = requestSlice.actions;

const { reducer } = requestSlice;
export default reducer;
