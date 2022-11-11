import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { v4 as uuid } from 'uuid';
import { getToken } from 'next-auth/jwt';
import {
  Thing,
  getContainedResourceUrlAll,
  getDatetime,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrl,
} from '@inrupt/solid-client';
import fetchFactory from '../../../lib/fetchFactory';
import { authOptions } from '../auth/[...nextauth]';
import { turtleACL, turtleSubjectRequest } from '../../../lib/solid';

export type GetResponseItem = {
  id: string;
  url: string;
  requestorWebId: string;
  purpose: string;
  created: Date;
  // isShared: boolean;
};

type PostResponse = {
  id: string;
  location: URL;
};

type ResponseType = GetResponseItem[] | PostResponse;

function processRequest(thing: Thing) {
  return {
    url: thing.url,
    type: getUrl(thing, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') ?? '',
    documentTitle: getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}documentTitle`) ?? '',
    documentType: getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}documentType`) ?? '',
    id: getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}id`) ?? '',
    providerWebId: getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}providerWebId`) ?? '',
    purpose: getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}purpose`) ?? '',
    requestorWebId: getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}requestorWebId`) ?? '',
    returnUrl: getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}returnUrl`) ?? '',
    created: getDatetime(thing, 'http://purl.org/dc/terms/created') ?? new Date(), // TODO: Missing dates?
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const session = await unstable_getServerSession(req, res, authOptions(req, res));

  if (!session) {
    res.status(401).end();
    return;
  }

  const token = await getToken({ req });
  const fetch = fetchFactory({ keyPair: token?.keys, dpopToken: token?.dpopToken });

  if (req.method === 'GET') {
    const pageSize = 5;
    const page = Number(req.query.page) ?? 0;

    let requestsUrlList: string[] = [];
    const resourceLocation = `${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}requests/subject/`;
    try {
      const dsRequestsList = await getSolidDataset(resourceLocation, { fetch });
      requestsUrlList = getContainedResourceUrlAll(dsRequestsList);
    } catch (error: any) {
      if (error.response.status !== 404) {
        throw error;
      }
      res.status(200).json([]);
    }

    // let sharedResources: string[] = [];
    // const sharedResourcesLocation = `${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}consents/consumer/`;
    // try {
    //   const dsSharedResources = await getSolidDataset(sharedResourcesLocation, { fetch });
    //   sharedResources = getContainedResourceUrlAll(dsSharedResources);
    // } catch (error: any) {
    //   if (error.response.status !== 404) {
    //     throw error;
    //   }
    // }
    // const sharedResourceIds = await Promise.all(
    //   sharedResources.map(async (url) => {
    //     const thing = getThing(await getSolidDataset(url, { fetch }), url) as Thing;
    //     return getStringNoLocale(thing, `${process.env.EGENDATA_SCHEMA_URL}requestId`) as string;
    //   }),
    // );

    // // console.log(requestsList, sharedResourceIds);

    // const resources = requestsList.map(
    //   (r): GetResponseItem => ({
    //     id: r.id,
    //     url: r.url,
    //     requestorWebId: r.requestorWebId,
    //     purpose: r.purpose,
    //     created: r.created,
    //     isShared: sharedResourceIds.includes(r.id),
    //   }),
    // );

    const start = page * pageSize;
    const end = start + pageSize;

    const resources = await Promise.all(
      requestsUrlList.slice(start, end).map(async (url) => {
        const thing = getThing(await getSolidDataset(url, { fetch }), url) as Thing;
        return processRequest(thing);
      }),
    );

    res.status(200).json(resources);
  } else if (req.method === 'POST') {
    const webId = session.webid;
    const id = uuid();

    const subjectRequestURL = new URL(id, `${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}requests/subject/`);

    const data = turtleSubjectRequest({ ...req.body, id: id, date: new Date() });
    await fetch(subjectRequestURL.toString(), {
      method: 'PUT',
      body: data,
      headers: { 'Content-Type': 'text/turtle' },
    });

    const acl = turtleACL(subjectRequestURL.toString(), [
      { label: 'owner', agent: webId as string, mode: ['Control', 'Write', 'Append', 'Read'] },
    ]);
    await fetch(new URL(`${subjectRequestURL.pathname.split('/').pop()}.acl`, subjectRequestURL.toString()), {
      method: 'PUT',
      body: acl,
      headers: { 'Content-Type': 'text/turtle' },
    });

    console.info(`Created request ${subjectRequestURL}`);

    res.status(200).json({
      id,
      location: new URL(id, `${process.env.NEXTAUTH_URL}/api/request/`),
    });
  } else {
    res.status(405);
  }
  res.end();
}
