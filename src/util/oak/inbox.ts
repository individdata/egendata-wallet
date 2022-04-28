/* eslint-disable no-console */
import {
  getSolidDataset, getThing, getStringNoLocale, Thing, getUrl, getUrlAll, getStringNoLocaleAll,
} from '@inrupt/solid-client';
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteFile } from './solid';

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
  type: string,
};

export async function inboxItem(url: string) {
  console.log('inboxItem url = ', url);
  const ds = await getSolidDataset(url, { fetch });
  // console.log('ds=', ds);
  const item = getThing(ds, url) as Thing;
  const requestUrl = getUrl(item, 'https://oak.se/dataRequest');
  // console.log('requestUrl=', requestUrl);
  if (requestUrl) {
    const dataSet = await getSolidDataset(requestUrl, { fetch });
    const thing = getThing(dataSet, requestUrl) as Thing;
    // console.log('thing=', thing);
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
    return dataRequest;
  }
  /*
    const responseUrl = getUrl(item, 'https://oak.se/dataResponseUrl');
    const thing = getThing(ds, responseUrl!) as Thing;
    const id = getStringNoLocale(thing, 'http://schema.org/identifier') ?? '';
    return {
      id
    } as DataResponse;
    */
  const dataRequest = {
    id: '0',
    subject: '',
    pnr: '',
    requestedData: [''],
    requestedFrom: '',
    requestedBy: '',
    type: '',
  } as DataRequest;
  return dataRequest;
}

export async function inboxContent(inboxUrl: string) {
  const ds = await getSolidDataset(inboxUrl, { fetch });
  const inbox = getThing(ds, inboxUrl) as Thing;
  const content: Array<string> = getUrlAll(inbox, 'http://www.w3.org/ns/ldp#contains');
  // console.log('inboxContent=', content);
  const list = Promise.all(
    content.map(
      async (url) => inboxItem(url),
    ),
  );
  console.log('list=', list);
  return list;
}

export async function inboxClean(inboxUrl: string) {
  const ds = await getSolidDataset(inboxUrl, { fetch });
  const inbox = getThing(ds, inboxUrl) as Thing;
  const content: Array<string> = getUrlAll(inbox, 'http://www.w3.org/ns/ldp#contains');
  content.forEach(
    async (item: string) => {
      await deleteFile(item);
    },
  );
}

export const getInboxItem = createAsyncThunk<DataRequest | DataResponse, string>(
  'inbox/getInboxItem',
  async (itemUrl): Promise<DataRequest> => inboxItem(itemUrl),
);
