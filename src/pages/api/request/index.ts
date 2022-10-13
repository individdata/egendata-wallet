// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { v4 as uuid } from 'uuid';
import { getToken } from 'next-auth/jwt';
import {
  buildThing,
  createSolidDataset,
  createThing,
  getContainedResourceUrlAll,
  getDatetime,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrl,
  saveSolidDatasetAt,
  setThing,
  Thing,
  setAgentResourceAccess,
  createAcl,
  saveAclFor,
  getSolidDatasetWithAcl,
  getResourceInfoWithAcl,
  hasAcl,
  getResourceAcl,
  setIri,
  setUrl,
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
  isShared: boolean;
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const session = await unstable_getServerSession(req, res, authOptions(req, res));

  if (!session) {
    res.status(401).end();
    return;
  }

  const token = await getToken({ req });
  const fetch = fetchFactory({ keyPair: token?.keys, dpopToken: token?.dpopToken });

  if (req.method === 'GET') {
    let requestsUrlList: string[] = [];
    const resourceLocation = `${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}requests/subject/`;
    try {
      const dsRequestsList = await getSolidDataset(resourceLocation, { fetch });
      requestsUrlList = getContainedResourceUrlAll(dsRequestsList);
    } catch (error: any) {
      if (error.response.status !== 404) {
        throw error;
      }
      return res.status(404).end();
    }
    const requestsList = await Promise.all(
      requestsUrlList.map(async (url) => {
        const thing = getThing(await getSolidDataset(url, { fetch }), url) as Thing;
        return processRequest(thing);
      }),
    );

    let sharedResources: string[] = [];
    const sharedResourcesLocation = `${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}consents/consumer/`;
    try {
      const dsSharedResources = await getSolidDataset(sharedResourcesLocation, { fetch });
      sharedResources = getContainedResourceUrlAll(dsSharedResources);
    } catch (error: any) {
      if (error.response.status !== 404) {
        throw error;
      }
    }
    const sharedResourceIds = await Promise.all(
      sharedResources.map(async (url) => {
        const thing = getThing(await getSolidDataset(url, { fetch }), url) as Thing;
        return getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#requestId') as string;
      }),
    );

    // console.log(requestsList, sharedResourceIds);

    const resources = requestsList.map(
      (r): GetResponseItem => ({
        id: r.id,
        url: r.url,
        requestorWebId: r.requestorWebId,
        purpose: r.purpose,
        created: r.created,
        isShared: sharedResourceIds.includes(r.id),
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
