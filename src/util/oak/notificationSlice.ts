/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { AuthorizedUser } from '../../pages/auth/types';
import { storeInboundDataRequest } from '../../pages/requests/requestSlice';
import { RootState } from '../../store';
import { InboundDataRequest } from './datarequest';
import { inboxItem } from './inbox';

import { deleteFile, postFile } from './solid';

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

let ws: WebSocket | undefined;

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
      const wstarget = `wss://digital-wallet-backend-oak-develop.test.services.jtech.se/${uuid}`;

      ws = new WebSocket(wstarget);

      ws.onmessage = async (evt: MessageEvent) => {
        const notification: Notification = JSON.parse(evt.data);
        console.log(`notification = ${{ evt }}`);
        if (isCreate(notification)) {
          console.log(`link = ${notification.object.id}`);
          // dispatch(getInboxItem(notification.object.id));
          const dataRequest = await inboxItem(notification.object.id);
          const inboundDataRequest: InboundDataRequest = {
            id: dataRequest.id,
            requestorWebId: dataRequest.requestedBy,
            providerWebId: dataRequest.requestedFrom,
            documentType: dataRequest.type,
            purpose: '',
            returnUrl: '',
          };
          dispatch(storeInboundDataRequest(inboundDataRequest));
        }
      };

      ws.onclose = (evt: CloseEvent) => {
        console.log('ws closed: ', { evt });
      };

      ws.onerror = (evt: Event) => {
        console.log('ws error: ', { evt });
      };

      console.log('starting webhook handling ...');
      // const target = 'http://localhost:8999/webhook/' + uuid;
      const target = `https://digital-wallet-backend-oak-develop.test.services.jtech.se/webhook/${uuid}`;
      const subscrdata = {
        '@context': ['https://www.w3.org/ns/solid/notification/v1'],
        type: 'WebHookSubscription2021',
        topic: inboxUrl,
        target,
      };

      // const subscription = `http://localhost:3000/subscription`; // should be taken from well-known ..
      const subscription = 'https://oak-pod-provider-oak-develop.test.services.jtech.se/subscription';

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
    });

    builder.addCase(unsubscribe.pending, (state) => {
      state.status = 'disconnecting';
    });

    builder.addCase(unsubscribe.fulfilled, (state) => {
      state.status = 'idle';
      state.uuid = undefined;
    });
  },
});

const { reducer } = notificationSlice;
export default reducer;
