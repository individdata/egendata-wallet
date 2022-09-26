/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  consumerConsentsPath, dataPath, getProcesses, inboxPath, providerConsentsPath, providerRequestsPath,
} from '../../util/oak/egendata';
import { fetchProfileData } from '../../util/oak/solid';
import { consumerConsentThunks, ConsumerConsent } from './consents/consumerConsentSlice';
import { providerConsentThunks, ProviderConsent } from './consents/providerConsentSlice';
import { providerRequestThunks, ProviderRequest } from './requests/providerRequestsSlice';
import { dataThunks, Data } from './dataSlice';
import { subjectRequestThunks, subjectRequest, SubjectRequest } from './requests/subjectRequestsSlice';
import { NamedOptionalResource, NamedResource } from '../../util/thunkCreator';
import {
  InboundDataRequest, storeOutboundRequestLink, storeOutboundResponseAcl, storeOutboundResponseLink,
} from '../../util/oak/templates';

export type FetchConsent = {
  requestId: string,
  providerWebId: string,
  consentDocument: string,
};

export type ShareConsent = {
  requestId: string,
  requestorWebId: string,
  consentDocument: string,
};

export type RequestState = 'void' | 'received' | 'fetching' | 'available' | 'shared';

export type ProcessState = {
  status: 'pending' | 'success' | 'error',
  requestId: string,
  state: RequestState,
};

export type ProcessesState = Record<string, ProcessState>;

export const saveIncomingRequest = createAsyncThunk<SubjectRequest, InboundDataRequest>(
  'requests/saveIncomingRequest',
  async (request, { getState, dispatch }): Promise<SubjectRequest> => {
    const state = getState() as RootState;
    console.log(`saveIncomingRequest, state = ${state}`);
    const { user } = state.auth;
    const userPod = user.storage;
    const resource = subjectRequest(userPod, user.webid, request);
    console.log(`saveIncomingRequest: ${resource}`);
    const createAction = await dispatch(subjectRequestThunks.create(resource));
    const { payload } = createAction;
    return (payload as NamedResource<SubjectRequest>).resource;
  },
);

// TODO: This is used where AnyAction is expected. What type should it be?
export const consentFetch = createAsyncThunk<void, FetchConsent>(
  'requests/consentFetch',
  async (consent, { getState, dispatch }): Promise<void> => {
    const state = getState() as RootState;
    const { items } = state.subjectRequests;
    const request = items[consent.requestId];
    const { providerWebId } = request;
    const providerProfile = await fetchProfileData(providerWebId);
    const providerPodStorage = providerProfile.storage;

    const { user } = state.auth;
    if (!user || !user.storage) return;

    const userWebId = user.webid;
    const userPod = user.storage;
    const providerRequestResourceUrl = userPod + providerRequestsPath + request.id;
    const providerConsentResourceUrl = userPod + providerConsentsPath + request.id;
    const dataResourceUrl = userPod + dataPath + request.id;
    const inboxUrl = userPod + inboxPath;
    const dataResource: NamedOptionalResource<Data> = {
      resourceId: request.id,
      resourceUrl: dataResourceUrl,
      resource: undefined,
      acl: [
        { label: 'owner', webId: userWebId, mode: ['Read', 'Write', 'Append', 'Control'] },
        { label: 'provider', webId: providerWebId, mode: ['Write', 'Append'] },
      ],
    };
    const providerRequestResource: NamedResource<ProviderRequest> = {
      resourceId: request.id,
      resourceUrl: providerRequestResourceUrl,
      resource: {
        id: request.id,
        created: (new Date()).toISOString(),
        documentType: request.documentType,
        dataSubjectIdentifier: userWebId,
        notificationInbox: inboxUrl,
        dataLocation: dataResourceUrl,
      },
      acl: [
        { label: 'owner', webId: userWebId, mode: ['Read', 'Write', 'Append', 'Control'] },
        { label: 'provider', webId: providerWebId, mode: ['Read'] },
      ],
    };
    const providerConsentResource: NamedResource<ProviderConsent> = {
      resourceId: request.id,
      resourceUrl: providerConsentResourceUrl,
      resource: {
        created: new Date().toISOString(),
        requestId: request.id,
        providerRequest: providerRequestResourceUrl,
        providerWebId,
        consentDocument: consent.consentDocument,
      },
    };
    await dispatch(providerRequestThunks.create(providerRequestResource));
    await dispatch(dataThunks.create(dataResource));
    await dispatch(providerConsentThunks.create(providerConsentResource));
    await storeOutboundRequestLink(request.id, userPod, providerPodStorage);
  },
);

export const consentShare = createAsyncThunk<void, ShareConsent>(
  'requests/consentShare',
  async (consent, { getState, dispatch }): Promise<void> => {
    const state = getState() as RootState;

    const { user } = state.auth;
    if (!user || !user.storage) return;

    const userWebId = user.webid;
    const userPod = user.storage;
    const { requestId } = consent;
    const dataUrl = userPod + dataPath + requestId;
    const requestorProfile = await fetchProfileData(consent.requestorWebId);
    const requestorPod = requestorProfile.storage;

    const consumerConsent: ConsumerConsent = {
      created: new Date().toISOString(), // iso8601 timestamp
      requestId,
      sharedData: dataUrl,
      consumerWebId: consent.requestorWebId,
      consentDocument: consent.consentDocument,
    };
    const consumerConsentUrl = userPod + consumerConsentsPath + requestId;
    const consumerConsentResource: NamedResource<ConsumerConsent> = {
      resourceId: requestId,
      resourceUrl: consumerConsentUrl,
      resource: consumerConsent,
    };

    await dispatch(consumerConsentThunks.create(consumerConsentResource));
    await storeOutboundResponseAcl(requestId, userPod, userWebId, consent.requestorWebId);
    await storeOutboundResponseLink(requestId, userPod, requestorPod);
  },
);

export const syncStateFromPod = createAsyncThunk<{ id: string, state: RequestState }[], string>(
  'syncStateFromPod',
  async (storage: string, { getState, dispatch }): Promise<{ id: string, state: RequestState }[]> => {
    const state = getState() as RootState;
    await Promise.all([
      dispatch(subjectRequestThunks.getContent({ storage, currentResources: Object.keys(state.subjectRequests.items) })),
      dispatch(providerRequestThunks.getContent({ storage, currentResources: Object.keys(state.providerRequests.items) })),
      dispatch(providerConsentThunks.getContent({ storage, currentResources: Object.keys(state.providerConsents.items) })),
      dispatch(consumerConsentThunks.getContent({ storage, currentResources: Object.keys(state.consumerConsents.items) })),
      dispatch(dataThunks.getContent({ storage, currentResources: Object.keys(state.data.items) })),
    ]);

    return getProcesses(state);
  },
);
