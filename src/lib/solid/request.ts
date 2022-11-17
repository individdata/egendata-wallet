import {
  SolidDataset,
  Thing,
  getContainedResourceUrlAll,
  getDatetime,
  getInteger,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrl,
} from '@inrupt/solid-client';
import { RequestInfo, RequestInfoWithDetails } from '../../types';
import { fetchInterface } from '../fetchFactory';

export const requestFromURL = async (
  url: URL,
  { fetch }: { fetch: fetchInterface },
): Promise<RequestInfoWithDetails> => {
  const ds = await getSolidDataset(url.toString(), { fetch });
  const requestInfo = requestFromContainerDS(ds);

  const subjectURL = new URL('subject', url);

  const subject = getThing(await getSolidDataset(subjectURL.toString(), { fetch }), subjectURL.toString()) as Thing;

  if (getStringNoLocale(subject, `${process.env.EGENDATA_SCHEMA_URL}id`) !== requestInfo.id)
    throw Error('Request ID in resource does not match id from URL.');

  return {
    ...requestInfo,
    type: getUrl(subject, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') as string,
    documentTitle: getStringNoLocale(subject, `${process.env.EGENDATA_SCHEMA_URL}documentTitle`) as string,
    documentType: getStringNoLocale(subject, `${process.env.EGENDATA_SCHEMA_URL}documentType`) as string,
    providerWebId: new URL(getStringNoLocale(subject, `${process.env.EGENDATA_SCHEMA_URL}providerWebId`) as string),
    purpose: getStringNoLocale(subject, `${process.env.EGENDATA_SCHEMA_URL}purpose`) as string,
    requestorWebId: new URL(getStringNoLocale(subject, `${process.env.EGENDATA_SCHEMA_URL}requestorWebId`) as string),
    returnUrl: new URL(getStringNoLocale(subject, `${process.env.EGENDATA_SCHEMA_URL}returnUrl`) as string),
    created: getDatetime(subject, 'http://purl.org/dc/terms/created') as Date,
  };
};

export const requestFromContainerDS = (ds: SolidDataset): RequestInfo => {
  const urls = getContainedResourceUrlAll(ds).map((el) => new URL(el));
  const subject = urls.find((el) => el.pathname.endsWith('/subject'));

  if (!subject) throw Error('Missing subject resource.');

  const url = new URL('./', subject);
  const id = subject.pathname
    .match(/\/requests\/([0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12})/i)
    ?.pop();

  if (!id) throw Error('Expected URL to contain id.');

  const fetch = urls.find((el) => el.pathname.endsWith('/fetch'));
  const data = urls.find((el) => el.pathname.endsWith('/data'));

  if ((fetch && !data) || (!fetch && data)) throw Error('Resource must contain both or neither of fetch and data.');

  if (!fetch && !data) {
    return { id, url, state: 'received' };
  }

  const dataSize = getInteger(getThing(ds, data!.toString()) as Thing, 'http://www.w3.org/ns/posix/stat#size');
  if (dataSize === 0) {
    return { id, url, state: 'fetching' };
  }

  const consent = urls.find((el) => el.pathname.endsWith('/consent'));
  if (!consent) {
    return { id, url, state: 'available' };
  }

  return { id, url, state: 'shared' };
};
