/* eslint-disable */
import {
  getSolidDataset, getThing, getStringNoLocale, Thing, getUrl, getUrlAll, getStringNoLocaleAll,
} from '@inrupt/solid-client';
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';
import { egendataSchema } from './egendata';
import { InboundDataRequest } from './templates';

async function requestItem(requestUrl: string) {
  const ds = await getSolidDataset(requestUrl, { fetch });
  const thing = getThing(ds, requestUrl) as Thing;
  // console.log('my thing:', thing);
  if (!thing) {
    return null;
  }
  const id = getStringNoLocale(thing, `${egendataSchema}id`) ?? '';
  const requestorWebId = getStringNoLocale(thing, `${egendataSchema}requestorWebId`) ?? '';
  const providerWebId = getStringNoLocale(thing, `${egendataSchema}providerWebId`) ?? '';
  const documentType = getStringNoLocale(thing, `${egendataSchema}documentType`) ?? '';
  const purpose = getStringNoLocale(thing, `${egendataSchema}purpose`) ?? '';
  const returnUrl = getStringNoLocale(thing, `${egendataSchema}returnUrl`) ?? '';

  const dataRequest: InboundDataRequest = {
    id,
    requestorWebId,
    providerWebId,
    documentType,
    purpose,
    returnUrl,
  };

  return dataRequest;
}

export async function requestsContent(requestsUrl: string) {
  const ds = await getSolidDataset(requestsUrl, { fetch });
  const request = getThing(ds, requestsUrl) as Thing;
  const content: Array<string> = getUrlAll(request, 'http://www.w3.org/ns/ldp#contains');
  console.log("content", content);
  const list = await Promise.all(
    content.map(
      async (url) => requestItem(url),
    ),
  );
  return list;
}
