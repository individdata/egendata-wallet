import {
  Thing,
  buildThing,
  createAcl,
  createSolidDataset,
  createThing,
  getDatetime,
  getSolidDataset,
  getSolidDatasetWithAcl,
  getStringNoLocale,
  getThing,
  getUrl,
  getUrlAll,
  saveAclFor,
  saveSolidDatasetAt,
  setAgentResourceAccess,
  setThing,
} from '@inrupt/solid-client';
import { ResponseData } from '../pages/api/request/[id]';
import { fetchInterface } from './fetchFactory';
import {
  aclURL,
  turtleACL,
  turtleConsumerConsent,
  turtleNotification,
  turtleProviderConsent,
  turtleProviderRequest,
} from './solid';

type RequestState = 'received' | 'fetching' | 'available' | 'sharing';

function processRequest(thing: Thing) {
  return {
    url: thing.url,
    type: getUrl(thing, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') ?? '',
    documentTitle: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#documentTitle') ?? '',
    documentType: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#documentType') ?? '',
    id: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#id') ?? '',
    providerWebId: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#providerWebId') ?? '',
    purpose: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#purpose') ?? '',
    requestorWebId: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#requestorWebId') ?? '',
    returnUrl: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#returnUrl') ?? '',
    created: getDatetime(thing, 'http://purl.org/dc/terms/created') ?? new Date(), // TODO: Missing dates?
  };
}

export const changeToFetching = async (webId: string, requestURL: URL, fetch: fetchInterface) => {
  let ds, acl;
  const baseURL = new URL('../../', requestURL);

  const requestThing = getThing(
    await getSolidDataset(requestURL.toString(), { fetch }),
    requestURL.toString(),
  ) as Thing;
  const documentType =
    getStringNoLocale(requestThing, 'https://pod-test.egendata.se/schema/core/v1#documentType') ?? '';
  const providerWebId =
    getStringNoLocale(requestThing, 'https://pod-test.egendata.se/schema/core/v1#providerWebId') ?? '';

  const providerStorageURL =
    getUrl(
      getThing(await getSolidDataset(providerWebId, { fetch }), providerWebId) as Thing,
      'http://www.w3.org/ns/pim/space#storage',
    ) ?? '';

  const providerRequestId = requestURL.pathname.split('/').pop() ?? '';
  const providerRequestURL = new URL(`requests/provider/${providerRequestId}`, baseURL);
  const dataLocation = new URL(`data/${providerRequestId}`, baseURL);
  const inboxLocation = new URL(`inbox/${providerRequestId}/`, baseURL);

  // Write provider request
  const providerRequest = turtleProviderRequest({
    id: providerRequestId,
    dataSubjectIdentifier: webId,
    dataLocation: dataLocation.toString(),
    notificationInbox: inboxLocation.toString(),
    documentType: documentType,
    date: new Date(),
  });
  await fetch(providerRequestURL.toString(), {
    method: 'PUT',
    body: providerRequest,
    headers: { 'Content-Type': 'text/turtle' },
  });

  // Write ACL for provider request
  const providerRequestACL = turtleACL(providerRequestURL.toString(), [
    { label: 'owner', agent: webId, mode: ['Control', 'Write', 'Append', 'Read'] },
    { label: 'provider', agent: providerWebId, mode: ['Read'] },
  ]);
  await fetch(aclURL(providerRequestURL).toString(), {
    method: 'PUT',
    body: providerRequestACL,
    headers: { 'Content-Type': 'text/turtle' },
  });

  const providerConsentURL = new URL(`consents/provider/${providerRequestId}`, baseURL);

  // Write provider consent
  const providerConsent = turtleProviderConsent({
    consentDocument: 'consent text...',
    providerRequest: providerRequestURL.toString(),
    providerWebId: webId,
    requestId: providerRequestId,
    date: new Date(),
  });
  await fetch(providerConsentURL.toString(), {
    method: 'PUT',
    body: providerConsent,
    headers: { 'Content-Type': 'text/turtle' },
  });

  const dataURL = new URL(`data/${providerRequestId}`, baseURL);

  // Write data resource
  await fetch(dataURL.toString(), {
    method: 'PUT',
    body: '',
    headers: { 'Content-Type': 'text/turtle' },
  });

  // Write ACL for data resource
  const dataACL = turtleACL(dataURL.toString(), [
    { label: 'owner', agent: webId, mode: ['Control', 'Write', 'Append', 'Read'] },
    { label: 'provider', agent: providerWebId, mode: ['Write', 'Append'] },
  ]);
  await fetch(aclURL(dataURL).toString(), {
    method: 'PUT',
    body: dataACL,
    headers: { 'Content-Type': 'text/turtle' },
  });

  const notificationURL = new URL(
    `${process.env.EGENDATA_PATH_FRAGMENT}inbox/${providerRequestId}`,
    providerStorageURL,
  );

  // Write notification
  const notification = turtleNotification({ providerRequest: providerRequestURL.toString() });
  const result = await fetch(notificationURL.toString(), {
    method: 'PUT',
    body: notification,
    headers: { 'Content-Type': 'text/turtle' },
  });

  console.log(result);
};

export const changeToSharing = async (webId: string, requestURL: URL, fetch: fetchInterface) => {
  let ds, acl;
  const baseURL = new URL('../../', requestURL);
  const providerRequestId = requestURL.pathname.split('/').pop() ?? '';

  // Fetch basic data from provider request
  const requestThing = getThing(
    await getSolidDataset(requestURL.toString(), { fetch }),
    requestURL.toString(),
  ) as Thing;
  const requestorWebId =
    getStringNoLocale(requestThing, 'https://pod-test.egendata.se/schema/core/v1#requestorWebId') ?? '';

  // Find data location
  const outboundRequestUrl = new URL('../../requests/provider/', requestURL);
  console.log(outboundRequestUrl.toString());
  const outboundRequestsThing = getThing(
    await getSolidDataset(outboundRequestUrl.toString(), { fetch }),
    outboundRequestUrl.toString(),
  ) as Thing;
  const outboundRequestsUrls = getUrlAll(outboundRequestsThing, 'http://www.w3.org/ns/ldp#contains');
  const outboundRequests = (
    await Promise.all(
      outboundRequestsUrls.map(async (url) => {
        const r = getThing(await getSolidDataset(url, { fetch }), url) as Thing;
        const rv = {
          id: getStringNoLocale(r, 'https://pod-test.egendata.se/schema/core/v1#id'),
          dataLocation: getStringNoLocale(r, 'https://pod-test.egendata.se/schema/core/v1#dataLocation'),
        };
        return rv;
      }),
    )
  )
    .filter((obj) => obj && obj.id === providerRequestId)
    .map(({ id, ...rest }) => rest);
  const dataLocation = new URL(outboundRequests[0].dataLocation!); // Assume single document for now.

  const consumerConsentURL = new URL(`consents/consumer/${providerRequestId}`, baseURL);

  // Write consumer consent
  const consumerConsent = turtleConsumerConsent({
    consentDocument: 'Consent text.',
    consumerWebId: requestorWebId,
    requestId: providerRequestId,
    sharedData: dataLocation.toString(),
    date: new Date(),
  });
  await fetch(consumerConsentURL.toString(), {
    method: 'PUT',
    body: consumerConsent,
    headers: { 'Content-Type': 'text/turtle' },
  });

  // const consumerConsent = buildThing(createThing({ url: consumerConsentURL.toString() }))
  // .addUrl(
  //   'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
  //   'https://pod-test.egendata.se/schema/core/v1#InboundDataResponse',
  // )
  // .addStringNoLocale('https://pod-test.egendata.se/schema/core/v1#consentDocument', 'consent text...')
  // .addStringNoLocale('https://pod-test.egendata.se/schema/core/v1#consumerWebId', requestorWebId)
  // .addStringNoLocale('https://pod-test.egendata.se/schema/core/v1#requestId', providerRequestId)
  // .addStringNoLocale('https://pod-test.egendata.se/schema/core/v1#sharedData', dataLocation!)
  // .addDatetime('http://purl.org/dc/terms/created', new Date())
  // .build();

  // ds = setThing(createSolidDataset(), consumerConsent);

  // console.log(consumerConsentURL.toString());

  // try {
  //   await saveSolidDatasetAt(consumerConsentURL.toString(), ds, { fetch });
  // } catch (error: any) {
  //   throw Error(`Failed to create consumer consent resource. (${consumerConsentURL.toString()})`);
  // }

  // Write ACL for consumer consent
  const updatedDataACL = turtleACL(dataLocation.toString(), [
    { label: 'owner', agent: webId, mode: ['Control', 'Write', 'Append', 'Read'] },
    { label: 'requestor', agent: requestorWebId, mode: ['Read'] },
  ]);
  await fetch(aclURL(dataLocation).toString(), {
    method: 'PUT',
    body: updatedDataACL,
    headers: { 'Content-Type': 'text/turtle' },
  });

  // ds = await getSolidDatasetWithAcl(dataLocation!, { fetch });
  // acl = createAcl(ds);
  // acl = setAgentResourceAccess(acl, webId, { read: true, write: true, append: true, control: true });
  // acl = setAgentResourceAccess(acl, requestorWebId, { read: true, write: false, append: false, control: false });

  // try {
  //   await saveAclFor(ds, acl, { fetch });
  // } catch (error: any) {
  //   throw Error(`Failed to update datastore ACL. (${dataLocation})`);
  // }
};

export const getRequestWithState = async (requestURL: URL, fetch: fetchInterface): Promise<ResponseData> => {
  const requestId = requestURL.pathname.split('/').pop() ?? '';

  const rv = (
    request: any,
    state: RequestState,
    outbound: { url: string }[],
    data: { url: string }[],
    consents: { url: string }[],
  ) => {
    return { ...request, state, related: { outbound, data, consents } };
  };

  // Fetch base data about request.
  console.log(`Fetching details of ${requestURL.toString()}`);
  const requestThing = getThing(
    await getSolidDataset(requestURL.toString(), { fetch }),
    requestURL.toString(),
  ) as Thing;
  const request = processRequest(requestThing);

  // Fetch list of all outbound request(s) that are associated with the request.
  // TODO: Should we use id of requests/provider instead of requestId of consents/provider
  const outboundRequestUrl = new URL('../../requests/provider/', requestURL);
  console.log(outboundRequestUrl.toString());
  let outboundRequestsThing;
  let outboundRequests: any[] = [];
  try {
    outboundRequestsThing = getThing(
      await getSolidDataset(outboundRequestUrl.toString(), { fetch }),
      outboundRequestUrl.toString(),
    ) as Thing;
  } catch (error: any) {
    if (error.response.status !== 404) {
      throw Error(`Failed to list contents of ${outboundRequestUrl.toString()}`);
    }
  }
  if (outboundRequestsThing) {
    const outboundRequestsUrls = getUrlAll(outboundRequestsThing, 'http://www.w3.org/ns/ldp#contains');
    outboundRequests = (
      await Promise.all(
        outboundRequestsUrls.map(async (url) => {
          const r = getThing(await getSolidDataset(url, { fetch }), url) as Thing;
          const rv = {
            url: r.url,
            id: getStringNoLocale(r, 'https://pod-test.egendata.se/schema/core/v1#id'),
          };
          return rv;
        }),
      )
    )
      .filter((obj) => obj && obj.id === requestId)
      .map(({ id, ...rest }) => rest);
  }

  if (outboundRequests.length === 0) {
    return rv(request, 'received', [], [], []);
  }

  // Check if data has been added.
  const url = new URL('../../data/', requestURL);
  console.log(url.toString());
  const r = getThing(await getSolidDataset(url.toString(), { fetch }), url.toString()) as Thing;
  const urls = getUrlAll(r, 'http://www.w3.org/ns/ldp#contains'); // TODO: Optimise better!
  const data = (
    await Promise.all(
      urls.map(async (url) => {
        // log(`Fetching ${url}`)
        const r = getThing(await getSolidDataset(url, { fetch }), url) as Thing;
        if (r) {
          const rv = {
            url,
            id: getStringNoLocale(r, 'https://pod-test.egendata.se/schema/core/v1#requestId'),
          };
          // console.log(rv);
          // log(`Finished with ${url}`)
          return rv;
        }
        return { url, id: '' };
      }),
    )
  )
    .filter((item) => item.id === requestId)
    .map(({ id, ...rest }) => rest);

  if (data.length < outboundRequests.length) {
    return rv(request, 'fetching', outboundRequests, [], []);
  }

  // Fetch consents associated with the request.
  const consumerConsentsUrl = new URL('../../consents/consumer/', requestURL);
  console.log(consumerConsentsUrl.toString());
  let consumerConsentsDS;
  try {
    consumerConsentsDS = await getSolidDataset(consumerConsentsUrl.toString(), { fetch });
  } catch (error: any) {
    if (error.response.status !== 404) {
      throw error;
    }
  }

  let consumerConsents;
  if (consumerConsentsDS) {
    const consumerConsentsThing = getThing(consumerConsentsDS, consumerConsentsUrl.toString()) as Thing;
    const consumerConsentsUrls = getUrlAll(consumerConsentsThing, 'http://www.w3.org/ns/ldp#contains');
    consumerConsents = (
      await Promise.all(
        consumerConsentsUrls.map(async (url) => {
          const r = getThing(await getSolidDataset(url, { fetch }), url) as Thing;
          if (r) {
            const rv = {
              url,
              id: getStringNoLocale(r, 'https://pod-test.egendata.se/schema/core/v1#requestId'),
            };
            return rv;
          }
          return { url, id: '' };
        }),
      )
    )
      .filter((item) => item.id === requestId)
      .map(({ id, ...rest }) => rest);
  }

  if (consumerConsents && consumerConsents.length > 0) {
    return rv(request, 'sharing', outboundRequests, data, consumerConsents);
  }

  return rv(request, 'available', outboundRequests, data, []);
};
