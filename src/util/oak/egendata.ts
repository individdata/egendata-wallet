/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getSolidDataset, getStringNoLocale, getStringNoLocaleAll, getThing, getUrl, removeUrl, Thing,
} from '@inrupt/solid-client';
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';
import { putFile } from './solid';
import config from '../config';

export const egendataSchema = `${config.podProviderBaseUrl}schema/core/v1#`;
export const egendataPrefixTurtle = `@prefix egendata: <${egendataSchema}> .`;
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
  const providerWebId = getUrl(thing, `${egendataSchema}providerWebId`) ?? '';
  const document = getUrl(thing, `${egendataSchema}document`) ?? '';
  const dataResponse = {
    requestId,
    providerWebId,
    document,
  } as DataResponse;
  console.log('dataResponse=', dataResponse);
  return { t: 'Response', v: dataResponse };
}
