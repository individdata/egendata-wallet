/* eslint-disable no-console */
import {
  getSolidDataset, getStringNoLocale, getStringNoLocaleAll, getThing, getUrl, removeUrl, Thing,
} from '@inrupt/solid-client';
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';
import { putFile } from './solid';
import config from '../config';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store/store';
// eslint-disable-next-line import/no-cycle
import { RequestState } from '../../store/slices/processesSlice';

/*
# Pod structure
/egendata
-- /requests
---- /subject
---- /provider
-- /consents
---- /provider
---- /consumer
-- /data
-- /inbox
*/

// omit leading slash and add trailing slash to caontainers
export const infraPath = 'egendata/';
export const requestsPath = `${infraPath}requests/`;
export const subjectRequestsPath = `${requestsPath}subject/`;
export const providerRequestsPath = `${requestsPath}provider/`;
export const consentsPath = `${infraPath}consents/`;
export const providerConsentsPath = `${consentsPath}provider/`;
export const consumerConsentsPath = `${consentsPath}consumer/`;
export const dataPath = `${infraPath}data/`;
export const inboxPath = `${infraPath}inbox/`;

export const egendataSchema = `${process.env.NEXT_PUBLIC_POD_BASE_URL}schema/core/v1#`;
export const egendataPrefixTurtle = `@prefix egendata: <${egendataSchema}> .`;
export const dcPrefixTurtle = '@prefix dcterm: <http://purl.org/dc/terms/> .';
export const xsdPrefixTurtle = '@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.';
export const classNamespace = (className: string) => `${egendataSchema}${className}`;

export type DataRequest = {
  id: string,
  subject: string,
  pnr: string,
  requestedData: string[],
  requestedFrom: string,
  requestedBy: string,
  type: string,
};

export type DataResponse = {
  created: string, // iso8601 timestamp
  id: string,
  requestId: string,
  providerWebId: string,
  document: string,
};
export type RequestItem = { t: 'Request', v: DataRequest };
export type ResponseItem = { t: 'Response', v: DataResponse };
export type UnknownItem = { t: 'Unknown' };
export type InboxItem = RequestItem | ResponseItem | UnknownItem;

export async function fetchThing(url: string) {
  const ds = await getSolidDataset(url, { fetch });
  return getThing(ds, url) as Thing;
}

export function getDataRequest(thing: Thing): RequestItem {
  const id = getStringNoLocale(thing, 'http://schema.org/identifier') ?? '';
  const requestedBy = getUrl(thing, 'http://www.w3.org/2007/ont/link#requestedBy') ?? '';
  const dataRequest = {
    id,
    subject: getUrl(thing, 'http://purl.org/dc/elements/1.1/subject') ?? '',
    pnr: getStringNoLocale(thing, 'https://oak.se/subjectId') ?? '',
    requestedData: getStringNoLocaleAll(thing, 'https://oak.se/requestedData') ?? '',
    requestedFrom: getUrl(thing, 'http://schema.org/sourceOrganization') ?? '',
    requestedBy,
    type: getUrl(thing, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') ?? '',
  } as DataRequest;
  console.log('dataRequest=', dataRequest);
  return { t: 'Request', v: dataRequest };
}

export function getDataResponse(thing: Thing): ResponseItem {
  const requestId = getStringNoLocale(thing, `${egendataSchema}requestId`) ?? '';
  const providerWebId = getStringNoLocale(thing, `${egendataSchema}providerWebId`) ?? '';
  const document = getStringNoLocale(thing, `${egendataSchema}document`) ?? '';
  const dataResponse = {
    requestId,
    providerWebId,
    document,
  } as DataResponse;
  console.log('dataResponse=', dataResponse);
  return { t: 'Response', v: dataResponse };
}

function toState(shared: boolean, available: boolean, fetching: boolean): RequestState {
  if (shared) return 'shared';
  if (available) return 'available';
  if (fetching) return 'fetching';
  return 'received';
}

export const getProcessByRequestId = (state: RootState, requestId: string) => {
  const shared = state.consumerConsents.items[requestId] !== undefined;
  const available = state.data.items[requestId] !== undefined;
  const fetching = state.providerConsents.items[requestId] !== undefined;
  const requestState: RequestState = toState(shared, available, fetching);
  return { id: requestId, state: requestState };
};

export const getProcesses = (state: RootState) => {
  const requests = Object.keys(state.subjectRequests.items);
  const processesState = requests.map((id) => getProcessByRequestId(state, id));
  return processesState;
};
