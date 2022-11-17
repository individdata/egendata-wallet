import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { v4 as uuid } from 'uuid';
import { getToken } from 'next-auth/jwt';
import { getContainedResourceUrlAll, getSolidDataset } from '@inrupt/solid-client';
import fetchFactory from '../../../lib/fetchFactory';
import { authOptions } from '../auth/[...nextauth]';
import { requestFromContainerDS, turtleACL, turtleSubjectRequest } from '../../../lib/solid';
import { RequestInfo } from '../../../types';

import logger from '../../../lib/logger';

type PostResponse = {
  id: string;
  location: URL;
};

type ResponseType = { requests: RequestInfo[]; total: number } | PostResponse;

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const session = await unstable_getServerSession(req, res, authOptions(req, res));

  if (!session) {
    res.status(401).end();
    return;
  }

  const token = await getToken({ req });
  const fetch = fetchFactory({ keyPair: token?.keys, dpopToken: token?.dpopToken });

  if (req.method === 'GET') {
    const pageSize = 25;
    const page = Number(req.query.page) ?? 0;

    let requestsUrlList: string[] = [];
    const resourceLocation = `${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}requests/`;
    try {
      requestsUrlList = getContainedResourceUrlAll(await getSolidDataset(resourceLocation, { fetch }));
    } catch (error: any) {
      if (error.response.status !== 404) {
        throw error;
      }
      res.status(200).json({ requests: [], total: 0 });
    }

    const start = page * pageSize;
    const end = start + pageSize;

    const resources = await Promise.all(
      requestsUrlList.slice(start, end).map(async (url) => {
        return requestFromContainerDS(await getSolidDataset(url, { fetch }));
      }),
    );

    res.status(200).json({ requests: resources, total: requestsUrlList.length });
  } else if (req.method === 'POST') {
    const webId = session.webid;
    const id = uuid();

    const subjectRequestURL = new URL(`${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}requests/${id}/subject`);

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

    logger.info(`Created request ${subjectRequestURL}`);

    res.status(200).json({
      id,
      location: new URL(id, `${process.env.NEXTAUTH_URL}/api/request/`),
    });
  } else {
    res.status(405);
  }
  res.end();
}
