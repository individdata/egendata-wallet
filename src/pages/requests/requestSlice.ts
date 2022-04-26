/* eslint-disable */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import { InboundDataRequest, inboundDataRequestTurtle, inboundDataRequestUrl } from '../../util/oak/datarequest';
import { DataRequest, DataResponse, inboxContent } from './inbox';
import { v4 as uuid } from 'uuid';
import { putFile } from '../../util/oak/solid';

export type InboxContent = string[];

type RequestState = {
  id: string;
  status: 'idle' | 'storingInboundRequest' | 'fetching' | 'selected' | 'unselected' | 'consenting' | 'checkingFetchInfo' | 'gotData' | 'gotShareInfo' | 'sharedData' ;
  error: string | null;
  content: DataRequest | DataResponse;
};

export const storeInboundDataRequest = createAsyncThunk<void, InboundDataRequest>(
  'request/saveInboundDataRequest',
  async (request, { getState }): Promise<void> => { 
    const state = getState() as RootState;
    const { user } = state.auth;
    if (user) {
      const userWebId = user.webid;
      const userPod = user.storage ?? userWebId;
      const id = uuid();
      const requestUrl = inboundDataRequestUrl(userPod, id);
      const requestData = inboundDataRequestTurtle(
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

export const getInboxContent = createAsyncThunk<Array<DataRequest | DataResponse>>(
  'inbox/getInboxContent',
  async (id, { getState }): Promise<DataRequest[]> => { 
    const state = getState() as RootState;
    const inboxUrl = state.auth.user?.storage + "oak/inbox/";
    return inboxContent(inboxUrl);
  },
);

export const requestSlice = createSlice({
  name: 'request',
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
    fetchInfo: (state, currentrequest) => {
      for (const item of state) {
        if (item.id === currentrequest.payload) {
          item.status = 'checkingFetchInfo';
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

    builder.addCase(storeInboundDataRequest.pending, (state) => {
      for (const item of state) {
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
