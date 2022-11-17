import {
  Thing,
  getDatetime,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrl,
  getUrlAll,
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
  turtleResponseNotification,
} from './solid';
import { v4 as uuid } from 'uuid';
import { requestFromURL } from '@app/lib/solid';

type RequestState = 'received' | 'fetching' | 'available' | 'sharing';

function processRequest(thing: Thing) {
  return {
    url: thing.url,
    type: getUrl(thing, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') ?? '',
    documentTitle: getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}documentTitle`),
    documentType: getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}documentType`),
    id: getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}id`),
    providerWebId: getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}providerWebId`),
    purpose: getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}purpose`),
    requestorWebId: getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}requestorWebId`),
    returnUrl: getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}returnUrl`),
    created: getDatetime(thing, 'http://purl.org/dc/terms/created'),
  };
}

export const changeToFetching = async (webId: string, seeAlso: string, requestURL: URL, fetch: fetchInterface) => {
  let ds, acl;

  const requestWithDetails = await requestFromURL(requestURL, { fetch });
  const { id: requestId, documentType, providerWebId } = requestWithDetails;

  // ds = await getSolidDataset('http://localhost:3002/2dce2d35-fcd5-4652-a269-040b2e92ec0e/profile/private', { fetch });
  ds = await getSolidDataset(seeAlso, { fetch });
  const profileThing = getThing(ds, `${seeAlso}#me`) as Thing;
  const ssn = getStringNoLocale(profileThing, `${process.env.EGENDATA_SCHEMA_URL}dataSubjectIdentifier`) as string;

  const providerStorageURL =
    getUrl(
      getThing(await getSolidDataset(providerWebId.toString(), { fetch }), providerWebId.toString()) as Thing,
      'http://www.w3.org/ns/pim/space#storage',
    ) ?? '';

  const fetchURL = new URL(`fetch`, requestURL);
  const dataLocation = new URL(`data`, requestURL);
  const inboxLocation = new URL(`../../inbox/${requestId}/`, requestURL);

  // Write provider request
  const providerRequest = turtleProviderRequest({
    id: requestId,
    dataSubjectIdentifier: ssn,
    dataLocation: dataLocation.toString(),
    notificationInbox: inboxLocation.toString(),
    documentType: documentType,
    date: new Date(),
  });
  await fetch(fetchURL.toString(), {
    method: 'PUT',
    body: providerRequest,
    headers: { 'Content-Type': 'text/turtle' },
  });

  // Write ACL for fetchURL
  const providerRequestACL = turtleACL(fetchURL.toString(), [
    { label: 'owner', agent: webId, mode: ['Control', 'Write', 'Append', 'Read'] },
    { label: 'provider', agent: providerWebId.toString(), mode: ['Read'] },
  ]);
  await fetch(aclURL(fetchURL).toString(), {
    method: 'PUT',
    body: providerRequestACL,
    headers: { 'Content-Type': 'text/turtle' },
  });

  const dataURL = new URL(`data`, requestURL);

  // Write data resource
  await fetch(dataURL.toString(), {
    method: 'PUT',
    body: '',
    headers: { 'Content-Type': 'text/turtle' },
  });

  // Write ACL for data resource
  const dataACL = turtleACL(dataURL.toString(), [
    { label: 'owner', agent: webId, mode: ['Control', 'Write', 'Append', 'Read'] },
    { label: 'provider', agent: providerWebId.toString(), mode: ['Write', 'Append'] },
  ]);
  await fetch(aclURL(dataURL).toString(), {
    method: 'PUT',
    body: dataACL,
    headers: { 'Content-Type': 'text/turtle' },
  });

  // TODO: Change to newly generated UUID instead of providerRequestId.
  const notificationURL = new URL(`${process.env.EGENDATA_PATH_FRAGMENT}inbox/${requestId}`, providerStorageURL);

  // Write notification
  const notification = turtleNotification({ providerRequest: notificationURL.toString() });
  const result = await fetch(notificationURL.toString(), {
    method: 'PUT',
    body: notification,
    headers: { 'Content-Type': 'text/turtle' },
  });

  // console.log(result);
};

export const changeToSharing = async (webId: string, requestURL: URL, fetch: fetchInterface) => {
  let ds, acl;

  const requestWithDetails = await requestFromURL(requestURL, { fetch });
  const { id: requestId, requestorWebId } = requestWithDetails;

  // const baseURL = new URL('../../', requestURL);
  // const providerRequestId = requestURL.pathname.split('/').pop() ?? '';

  // // Fetch basic data from provider request
  // const requestThing = getThing(
  //   await getSolidDataset(requestURL.toString(), { fetch }),
  //   requestURL.toString(),
  // ) as Thing;
  // const requestorWebId = getStringNoLocale(requestThing, `${process.env.EGENDATA_SCHEMA_URL}requestorWebId`) ?? '';

  const dataLocation = new URL(`data`, requestURL);
  const consumerConsentURL = new URL(`consent`, requestURL);

  // Write consumer consent
  const consumerConsent = turtleConsumerConsent({
    consentDocument: 'Consent text.',
    consumerWebId: requestorWebId.toString(),
    requestId: requestId,
    sharedData: dataLocation.toString(),
    date: new Date(),
  });
  await fetch(consumerConsentURL.toString(), {
    method: 'PUT',
    body: consumerConsent,
    headers: { 'Content-Type': 'text/turtle' },
  });

  // Update ACL for data resource
  const updatedDataACL = turtleACL(dataLocation.toString(), [
    { label: 'owner', agent: webId, mode: ['Control', 'Write', 'Append', 'Read'] },
    { label: 'requestor', agent: requestorWebId.toString(), mode: ['Read'] },
  ]);
  await fetch(aclURL(dataLocation).toString(), {
    method: 'PUT',
    body: updatedDataACL,
    headers: { 'Content-Type': 'text/turtle' },
  });

  const fetchLocation = new URL(`fetch`, requestURL);
  // Update ACL for fetch resource
  const updatedFetchACL = turtleACL(fetchLocation.toString(), [
    { label: 'owner', agent: webId, mode: ['Control', 'Write', 'Append', 'Read'] },
  ]);
  await fetch(aclURL(fetchLocation).toString(), {
    method: 'PUT',
    body: updatedFetchACL,
    headers: { 'Content-Type': 'text/turtle' },
  });

  // Write notification
  const consumerStorageURL =
    getUrl(
      getThing(await getSolidDataset(requestorWebId.toString(), { fetch }), requestorWebId.toString()) as Thing,
      'http://www.w3.org/ns/pim/space#storage',
    ) ?? '';

  if (consumerStorageURL) {
    const notificationURL = new URL(`${process.env.EGENDATA_PATH_FRAGMENT}inbox/${uuid()}`, consumerStorageURL);

    const notification = turtleResponseNotification({ dataLocation: dataLocation.toString() });
    const result = await fetch(notificationURL.toString(), {
      method: 'PUT',
      body: notification,
      headers: { 'Content-Type': 'text/turtle' },
    });

    // console.log(`Put notification in ${notificationURL.toString()}.`);
  }
};
