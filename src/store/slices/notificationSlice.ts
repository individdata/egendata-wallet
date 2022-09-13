/* eslint-disable no-case-declarations */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
import {
  createSlice, createAsyncThunk, ThunkDispatch, AnyAction,
} from '@reduxjs/toolkit';
import { saveIncomingRequest, syncStateFromPod } from './processesSlice';
import { RootState } from '../store';
import { InboundDataRequest } from '../../util/oak/templates';
import { inboxItem } from '../../util/oak/inbox';
import { deleteFile, postFile } from '../../util/oak/solid';
import config from '../../util/config';
import { RequestItem } from '../../util/oak/egendata';
import { connect, disconnect } from './websocketSlice';
import { NamedResource, ResourceUrl } from '../../util/thunkCreator';
import { Data, dataThunks } from './dataSlice';

type SubscriptionState = {
  unsubscribeEndpoint: string,

};

export type NotificationState = {
  subscriptions: Record<string, SubscriptionState>,
};

const initialState = {
  subscriptions: {},
} as NotificationState;

type Notification = {
  '@context': string[],
  id: string,
  type: string[],
  object: {
    topic: string,
    id: string
  },
  published: string,
  unsubscribe_endpoint: string
};

type OnNotificationType = (storage: string,
  currentResources: ResourceUrl[], notfication: Notification, dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => Promise<void>;

const onNotificationHandlers: Record<string, OnNotificationType> = {};

const dispatchNotification = async (
  storage: string,
  currentResources: ResourceUrl[],
  notification: Notification,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  getState: () => unknown,
) => {
  const state = getState() as RootState;
  const subjectRequests = Object.keys(state.subjectRequests.lookup);
  console.log('dispatchNotification subjectRequests:', subjectRequests);
  const { topic } = notification.object;
  if (!topic) {
    throw new Error('Cannot handle notification without a topic');
  }
  const handle = onNotificationHandlers[topic];
  handle(storage, subjectRequests, notification, dispatch);
};

function isCreate(notfication: Notification) {
  const type = notfication.type[0];
  return type === 'Create';
}

function isUpdate(notfication: Notification) {
  const type = notfication.type[0];
  return type === 'Update';
}

function toInboundDataRequest(item: RequestItem): InboundDataRequest {
  const dataRequest = item.v;
  return {
    id: dataRequest.id,
    requestorWebId: dataRequest.requestedBy,
    providerWebId: dataRequest.requestedFrom,
    documentType: dataRequest.type,
    documentTitle: 'fix later',
    purpose: '',
    returnUrl: '',
  };
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

export const handleInboxNotification = async (
  _storage: string,
  _currentResources: ResourceUrl[],
  notification: Notification,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
) => {
  console.log('Received notification', notification);
  const { topic, id } = notification.object;
  if (isCreate(notification)) {
    console.log(`topic = ${topic}`);
    const item = await inboxItem(id);
    switch (item.t) {
      case 'Request':
        const inboundDataRequest = toInboundDataRequest(item);
        dispatch(saveIncomingRequest(inboundDataRequest));
        break;
      case 'Response':
        const data: NamedResource<Data> = {
          resourceId: item.v.requestId,
          resourceUrl: id,
          resource: item.v,
        };
        dispatch(dataThunks.create(data));
        break;
        // eslint-disable-next-line no-empty
      default: {}
    }
  }
};

export const handleRequestsNotification = async (
  storage: string,
  currentResources: ResourceUrl[],
  notification: Notification,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
) => {
  console.log('Received notification', notification);
  // const { topic } = notification.object;
  if (isCreate(notification) || isUpdate(notification)) {
    // console.log(`Create, topic = ${topic}`);
    // if (!topic.endsWith('/')) {
    // dispatch(subjectRequestThunks.getContent({ storage, currentResources }));
    dispatch(syncStateFromPod(storage));
    // const item = await dispatch(subjectRequestThunks.fetch(topic));
    // console.log('handleRequestsNotification: requestItem = ', item);
    // dispatch(getRequestsContent());
    // }
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
    console.log('expandedTopics = ', expandedTopics);
    console.log('resourceId = ', resourceId);
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

export const subscribe = createAsyncThunk<string, { storage: string, topic: string, uuid: string, onMessage: OnNotificationType }>(
  'notification/subscribe',
  async (arg, { dispatch, getState }): Promise<string> => {
    const state = getState() as RootState;
    const subjectRequests = Object.keys(state.subjectRequests.items);
    const websocketState = state.websocket;
    const target = `${process.env.NEXT_PUBLIC_BACKEND_WS_URL}${arg.uuid}`;
    const { storage } = arg;

    onNotificationHandlers[arg.topic] = arg.onMessage;

    if (['closed', 'closing'].includes(websocketState.status)) {
      await dispatch(connect({
        target,
        onMessage: async (evt: MessageEvent) => {
          // const notification = ensureNotificationContainsTopic(JSON.parse(evt.data), subscriptions, arg.topic);
          const notification = JSON.parse(evt.data);
          dispatchNotification(storage, subjectRequests, notification, dispatch, getState);
        },
      }));
      console.log('websocketState:', websocketState);
    }

    console.log(`start webhook subscription of ${arg.topic}`);
    const subscriptionUrl = `${process.env.NEXT_PUBLIC_POD_BASE_URL}subscription`;
    const targetUrl = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}webhook/${arg.uuid}`;
    console.log(`webhook targetUrl: ${targetUrl}`);
    const subscriptionResponse = await subscribeTopic(arg.topic, subscriptionUrl, targetUrl);
    console.log('webhook subscription started: ', { subscriptionResponse });

    const subscriptionResponseJson = JSON.parse(subscriptionResponse.data);
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
  },
);

export const unsubscribeAll = createAsyncThunk<void>(
  'notification/unsubscribeAll',
  async (_, { getState, dispatch }): Promise<void> => {
    const { notification } = getState() as RootState;
    const { subscriptions } = notification;
    console.log('unsubscribe subscriptions: ', subscriptions);
    Object.keys(subscriptions).forEach(async (key) => {
      const endpoint = subscriptions[key].unsubscribeEndpoint;
      console.log(endpoint);
      if (endpoint) {
        await deleteFile(endpoint);
      }
    });
    // disconnect websocket
    console.log('disconnect websocket ');
    dispatch(disconnect());
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

    builder.addCase(unsubscribeAll.fulfilled, (state) => {
      state.subscriptions = {};
    });
  },
});

const { reducer } = notificationSlice;
export default reducer;
