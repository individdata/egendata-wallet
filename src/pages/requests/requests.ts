/* eslint-disable */
import {
  getSolidDataset, getThing, getStringNoLocale, Thing, getUrl, getUrlAll, getStringNoLocaleAll,
} from '@inrupt/solid-client';
import {
  fetch,
} from '@inrupt/solid-client-authn-browser';
import { InboundDataRequest } from '../../util/oak/datarequest';

async function requestItem(requestUrl: string) {
  // const egendata = 'https://oak-pod-provider-oak-develop.test.services.jtech.se/schema/core/v1#';
  const ds = await getSolidDataset(requestUrl, { fetch });
  const thing = getThing(ds, requestUrl) as Thing;
  console.log('my thing:', thing);
  const id = getStringNoLocale(thing, 'egendata:id') ?? '';
  const requestorWebId = getStringNoLocale(thing, 'egendata:requestorWebId') ?? '';
  const providerWebId = getStringNoLocale(thing, 'egendata:providerWebId') ?? '';
  const documentType = getStringNoLocale(thing, 'egendata:documentType') ?? '';
  const purpose = getStringNoLocale(thing, 'egendata:purpose') ?? '';
  const returnUrl = getStringNoLocale(thing, 'egendata:returnUrl') ?? '';

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

export async function requestContent(requestUrl: string) {
  const ds = await getSolidDataset(requestUrl, { fetch });
  const request = getThing(ds, requestUrl) as Thing;
  const content: Array<string> = getUrlAll(request, 'http://www.w3.org/ns/ldp#contains');
  const list = Promise.all(
    content.map(
      async (url) => requestItem(url),
    ),
  );
  return list;
}
