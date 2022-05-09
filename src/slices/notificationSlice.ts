/* eslint-disable no-case-declarations */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { AuthorizedUser } from '../pages/auth/types';
import { storeInboundDataRequest, add, fetched } from './requestsSlice';
import { RootState } from '../store';
import { InboundDataRequest } from '../util/oak/templates';
import { inboxItem } from '../util/oak/inbox';
import { deleteFile, postFile } from '../util/oak/solid';
import config from '../util/config';
import { DataResponse, RequestItem, ResponseItem } from '../util/oak/egendata';

type NotificationState = {
  status: 'idle' | 'connecting' | 'connected' | 'disconnecting',
  uuid: string | undefined,
  unsubscribe_endpoint: string | undefined,
};

const initialState = {
  status: 'idle',
  uuid: undefined,
  unsubscribe_endpoint: undefined,
} as NotificationState;

let ws: WebSocket;

type Notification = {
  '@context': string[],
  id: string,
  type: string[],
  object: {
    id: string
  },
  published: string,
  unsubscribe_endpoint: string
};

function isCreate(notfication: Notification) {
  const type = notfication.type[0];
  return type === 'Create';
}

function toInboundDataRequest(item: RequestItem): InboundDataRequest {
  const dataRequest = item.v;
  return {
    id: dataRequest.id,
    requestorWebId: dataRequest.requestedBy,
    providerWebId: dataRequest.requestedFrom,
    documentType: dataRequest.type,
    purpose: '',
    returnUrl: '',
  };
}

function toDataResponse(item: ResponseItem): DataResponse {
  return item.v;
}

export const subscribe = createAsyncThunk<NotificationState, AuthorizedUser>(
  'notification/subscribe',
  async (authorizedUser, { dispatch }): Promise<NotificationState> => {
  // async (authorizedUser): Promise<NotificationState> => {
    const { storage } = authorizedUser;
    console.log('notification/subscribe ', { authorizedUser });
    if (storage) {
      const inboxUrl = `${storage}oak/inbox/`;
      console.log(`inboxUrl = ${inboxUrl}`);

      const uuid = uuidv4();

      // const wstarget = 'ws://localhost:8999/' + uuid;
      const wstarget = `wss://digital-wallet-backend-oak-develop.test.services.jtech.se/${uuid}`; // TODO: Make configurable via environment
      console.log('Connecting to websocket:', wstarget);

      ws = new WebSocket(wstarget);

      ws.onmessage = async (evt: MessageEvent) => {
        const notification: Notification = JSON.parse(evt.data);
        console.log(`notification = ${{ evt }}`);
        if (isCreate(notification)) {
          console.log(`link = ${notification.object.id}`);
          // dispatch(getInboxItem(notification.object.id));
          const item = await inboxItem(notification.object.id);
          switch (item.t) {
            case 'Request':
              const inboundDataRequest = toInboundDataRequest(item);
              dispatch(storeInboundDataRequest(inboundDataRequest));
              dispatch(add(inboundDataRequest));
              break;
            case 'Response':
              const inboundDataResponse = toDataResponse(item);
              dispatch(fetched(inboundDataResponse.requestId));
              break;
              // eslint-disable-next-line no-empty
            default: {}
          }
        }
      };

      ws.onclose = (evt: CloseEvent) => {
        console.log('ws closed: ', { evt });
      };

      ws.onerror = (evt: Event) => {
        console.log('ws error: ', { evt });
      };

      let keepAliveId;
      clearInterval(keepAliveId);
      keepAliveId = setInterval(() => {
        ws.send('ping');
        // console.log('ping', new Date());
      }, 5000);

      console.log('starting webhook handling ...');
      // const target = 'http://localhost:8999/webhook/' + uuid;
      const target = `${config.backendBaseUrl}webhook/${uuid}`;
      const subscrdata = {
        '@context': ['https://www.w3.org/ns/solid/notification/v1'],
        type: 'WebHookSubscription2021',
        topic: inboxUrl,
        target,
      };

      const subscription = `${config.podProviderBaseUrl}subscription`;

      const subscriptionResponse = await postFile(
        subscription,
        { body: JSON.stringify(subscrdata) },
        'application/json',
      );
      console.log('webhook subscription started.');

      const subscriptionResponseJson = JSON.parse(subscriptionResponse.data);
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { unsubscribe_endpoint } = subscriptionResponseJson;

      console.log('uuid = ', uuid);

      console.log('ws = ', { ws });

      return {
        status: 'connected',
        uuid,
        unsubscribe_endpoint,
      };
    }
    return {
      status: 'connecting',
      uuid: undefined,
      unsubscribe_endpoint: undefined,
    };
  },
);

export const unsubscribe = createAsyncThunk<void>(
  'notification/unsubscribe',
  async (_, { getState }): Promise<void> => {
    const { notification } = getState() as RootState;
    if (notification.unsubscribe_endpoint) {
      await deleteFile(notification.unsubscribe_endpoint);
    }
    ws?.close();
  },
);

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(subscribe.pending, (state) => {
      state.status = 'connecting';
    });

    builder.addCase(subscribe.fulfilled, (state, { payload }) => {
      state.status = 'connected';
      state.uuid = payload.uuid;
      state.unsubscribe_endpoint = payload.unsubscribe_endpoint;
    });

    builder.addCase(subscribe.rejected, (state) => {
      state.status = 'idle';
    });

    builder.addCase(unsubscribe.pending, (state) => {
      state.status = 'disconnecting';
    });

    builder.addCase(unsubscribe.fulfilled, (state) => {
      state.status = 'idle';
      state.uuid = undefined;
      state.unsubscribe_endpoint = undefined;
    });
  },
});

const { reducer } = notificationSlice;
export default reducer;
