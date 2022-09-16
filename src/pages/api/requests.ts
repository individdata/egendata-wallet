// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

import fetchFactory from '../../lib/fetchFactory';

import { getSolidDataset, getThing, getUrl, getUrlAll, getContainedResourceUrlAll, Thing, getStringNoLocale, getDatetime } from '@inrupt/solid-client';

type Data = {};

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
    created: getDatetime(thing, 'http://purl.org/dc/terms/created') ?? new Date(),  // TODO: Missing dates?
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await unstable_getServerSession(req, res, authOptions(req, res));

  if (session) {
    // Signed in
    const fetch = fetchFactory({keyPair: session.keys, dpopToken: session.dpopToken});

    const resourceLocations = [
      `${session.storage}egendata/requests/provider/`,
      `${session.storage}egendata/requests/subject/`,
    ]

    const requests = await Promise.all(resourceLocations.map(
      async (resourceLocation) => {
        let ds;
        try {
          ds = await getSolidDataset(resourceLocation, { fetch });
        }
        catch (error) {
          return [];
        }
        const r = getThing(ds, resourceLocation) as Thing;

        return await Promise.all(getContainedResourceUrlAll(ds).map(
          async (resource) => {
            const ds = await getSolidDataset(resource, { fetch });
            return processRequest(getThing(ds, resource) as Thing);
          }
        ));
      }
    ));

    res.status(200).json(requests.flat());

  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
