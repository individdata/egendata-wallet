/* eslint-disable no-console */
import {
  getSolidDataset, getThing, Thing, getUrl, getUrlAll,
} from '@inrupt/solid-client';
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';
import { createAsyncThunk } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import {
  egendataSchema, fetchThing, getDataRequest, getDataResponse, InboxItem,
} from './egendata';
import { deleteFile } from './solid';

export async function inboxItem(url: string): Promise<InboxItem> {
  console.log('inboxItem url = ', url);
  const ds = await getSolidDataset(url, { fetch });
  const item = getThing(ds, url) as Thing;
  const requestUrl = getUrl(item, 'https://oak.se/dataRequest');
  const responseUrl = getUrl(item, `${egendataSchema}InboundDataResponse`);

  if (requestUrl) {
    const thing = await fetchThing(requestUrl);
    return getDataRequest(thing);
  }
  if (responseUrl) {
    const thing = await fetchThing(responseUrl);
    return getDataResponse(thing);
  }
  return { t: 'Unknown' };
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

export const getInboxItem = createAsyncThunk<InboxItem, string>(
  'inbox/getInboxItem',
  async (itemUrl): Promise<InboxItem> => inboxItem(itemUrl),
);
