/* eslint-disable no-case-declarations */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import {
  createSlice, createAsyncThunk, ThunkDispatch, AnyAction,
} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { storeInboundDataRequest, add, fetched } from './requestsSlice';
import { RootState } from '../store';
import { InboundDataRequest } from '../util/oak/templates';
import { inboxItem } from '../util/oak/inbox';
import { deleteFile, postFile } from '../util/oak/solid';
import config from '../util/config';
import { DataResponse, RequestItem, ResponseItem } from '../util/oak/egendata';
import { connect } from './websocketSlice';
import { requestItem } from '../util/oak/requests';

type SubscriptionState = {
  unsubscribeEndpoint: string,

};

export type NotificationState = {
  uuid: string,
  subscriptions: Record<string, SubscriptionState>,
};

const initialState = {
  uuid: uuidv4(),
  subscriptions: {},
} as NotificationState;

type Notification = {
  '@context': string[],
  id: string,
  type: string[],
  object: {
    topic?: string,
    id: string
  },
  published: string,
  unsubscribe_endpoint: string
};

type OnNotificationType = (notfication: Notification, dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => Promise<void>;

const onNotificationHandlers: Record<string, OnNotificationType> = {};

const dispatchNotification = async (notification: Notification, dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => {
  const { topic } = notification.object;
  if (!topic) {
    throw new Error('Cannot handle notification without a topic');
  }
  const handle = onNotificationHandlers[topic];
  handle(notification, dispatch);
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

async function subscribeTopic(topic: string, subscriptionEndpoint: string, target: string) {
  const subscrdata = {
    '@context': ['https://www.w3.org/ns/solid/notification/v1'],
    type: 'WebHookSubscription2021',
    topic,
    target,
  };

  const subscriptionResponse = await postFile(
    subscriptionEndpoint,
    { body: JSON.stringify(subscrdata) },
    'application/json',
  );

  return subscriptionResponse;
}

export const handleInboxNotification = async (notification: Notification, dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => {
  console.log('handleInboxNotification: notification = ', notification);
  const { topic } = notification.object;
  if (!topic) {
    throw new Error('Cannot handle notification without a topic');
  }
  if (isCreate(notification)) {
    console.log(`topic = ${topic}`);
    const item = await inboxItem(topic);
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleRequestsNotification = async (notification: Notification, dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => {
  console.log('handleRequestsNotification: notification = ', notification);
  const { topic } = notification.object;
  if (!topic) {
    throw new Error('Cannot handle notification without a topic');
  }
  if (isCreate(notification)) {
    console.log(`topic = ${topic}`);
    const item = await requestItem(topic);
    console.log('requestItem = ', item);
  }
};

function ensureNotificationContainsTopic(notification: Notification, subscriptions: Record<string, SubscriptionState>, topic: string): Notification {
  const { topic: objectTopic } = notification.object;
  const { id: resourceId } = notification.object;
  if (!objectTopic) {
    const topics = Object.keys(subscriptions);
    const expandedTopicsSet = new Set([...topics, topic]);
    const expandedTopics = Array.from(expandedTopicsSet);
    const foundSubscriptionTopic = expandedTopics.find((subscriptionTopic) => resourceId.startsWith(subscriptionTopic));
    if (!foundSubscriptionTopic) {
      throw new Error(`Received notification ${resourceId} but could not find corresponding subscription in cache`);
    }
    const newNotification = {
      ...notification,
    };
    newNotification.object.topic = foundSubscriptionTopic;
  }
  return notification;
}

export const subscribe = createAsyncThunk<string, { topic: string, onMessage: OnNotificationType }>(
  'notification/subscribe',
  async (arg, { dispatch, getState }): Promise<string> => {
    const state = getState() as RootState;
    const notificationState = state.notification;
    const { uuid, subscriptions } = notificationState;
    const websocketState = state.websocket;
    const target = `${config.backendWsUrl}${uuid}`;

    onNotificationHandlers[arg.topic] = arg.onMessage;

    if (['closed', 'closing'].includes(websocketState.status)) {
      await dispatch(connect({
        target,
        onMessage: async (evt: MessageEvent) => {
          const notification = ensureNotificationContainsTopic(JSON.parse(evt.data), subscriptions, arg.topic);
          dispatchNotification(notification, dispatch);
        },
      }));
      console.log('websocketState = ', websocketState);
    }

    console.log('start webhook subscription ...');
    const subscriptionUrl = `${config.podProviderBaseUrl}subscription`;
    const targetUrl = `${config.backendBaseUrl}webhook/${uuid}`;
    const subscriptionResponse = await subscribeTopic(arg.topic, subscriptionUrl, targetUrl);
    console.log('webhook subscription started.');

    const subscriptionResponseJson = JSON.parse(subscriptionResponse.data);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { unsubscribe_endpoint } = subscriptionResponseJson;
    return unsubscribe_endpoint;
  },
);

export const unsubscribe = createAsyncThunk<void, string>(
  'notification/unsubscribe',
  async (topic, { getState }): Promise<void> => {
    const { notification } = getState() as RootState;
    const { subscriptions } = notification;
    const endpoint = subscriptions[topic].unsubscribeEndpoint;
    if (endpoint) {
      await deleteFile(endpoint);
    }
    // ws?.close();
  },
);

export const unsubscribeAll = createAsyncThunk<void>(
  'notification/unsubscribe',
  async (_, { getState }): Promise<void> => {
    const { notification } = getState() as RootState;
    const { subscriptions } = notification;
    Object.keys(subscriptions).forEach(async (key) => {
      const endpoint = subscriptions[key].unsubscribeEndpoint;
      if (endpoint) {
        await deleteFile(endpoint);
      }
    });
    // ws?.close();
  },
);

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(subscribe.fulfilled, (state, action) => {
      const { arg } = action.meta;
      state.subscriptions[arg.topic] = {
        unsubscribeEndpoint: action.payload,
      };
    });

    builder.addCase(unsubscribe.fulfilled, (state, action) => {
      const itemKey = action.meta.arg;
      delete state.subscriptions[itemKey];
    });
  },
});

const { reducer } = notificationSlice;
export default reducer;
