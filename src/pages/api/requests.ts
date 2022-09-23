// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

import fetchFactory from '../../lib/fetchFactory';

import { getSolidDataset, getThing, getUrl, getUrlAll, getContainedResourceUrlAll, Thing, getStringNoLocale, getDatetime, FetchError } from '@inrupt/solid-client';
import { getToken } from 'next-auth/jwt';

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await unstable_getServerSession(req, res, authOptions(req, res));

  if (session) {
    // Signed in
    const token = await getToken({ req });

    const fetch = fetchFactory({keyPair: token?.keys, dpopToken: token?.dpopToken});

    let unsharedResources: string[] = [];
    let sharedResources: string[] = [];

    try {
      const resourceLocation = `${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}requests/subject/`;    
      const dsResourceList = await getSolidDataset(resourceLocation, { fetch });
      const resourceList = getContainedResourceUrlAll(dsResourceList).map((url) => url.split('/').pop());
      
      const sharedResourcesLocation = `${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}consents/consumer/`;
      const dsSharedResources = await getSolidDataset(sharedResourcesLocation, { fetch });
      const sharedResourcesList = getContainedResourceUrlAll(dsSharedResources);
      const sharedMap = (await Promise.all(sharedResourcesList.map(async (url) => {
        const r = getThing(await getSolidDataset(url, { fetch }), url) as Thing;
        return getStringNoLocale(r, 'https://pod-test.egendata.se/schema/core/v1#requestId');
      })));
      
      unsharedResources = resourceList.filter((requestId) => !sharedMap.includes(requestId)) as string[];
      sharedResources = resourceList.filter((requestId) => sharedMap.includes(requestId)) as string[];
    } catch(error: any) {
      if (error.response.status !== 404) {
        throw error;
      }
    }

    res.status(200).json({sharedRequests: sharedResources, unsharedRequests: unsharedResources});
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
