// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

import fetchFactory from '../../lib/fetchFactory';

import { getSolidDataset, getThing, getUrl, getUrlAll, getDatetime, getContainedResourceUrlAll, Thing, getStringNoLocale } from '@inrupt/solid-client';

type Data = {};

function processConsent(thing: Thing) {
  return {
    url: thing.url,
    type: getUrl(thing, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') ?? '',
    created: getDatetime(thing, 'http://purl.org/dc/terms/created') ?? new Date(),
    consentDocument: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#consentDocument'),
    providerRequest: getUrl(thing, 'https://pod-test.egendata.se/schema/core/v1#providerRequest'),
    providerWebId: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#providerWebId') ?? '',
    requestId: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#requestId') ?? '',
  }
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
      `${session.storage}egendata/consents/provider/`,
      `${session.storage}egendata/consents/consumer/`,
    ]

    const consents = await Promise.all(resourceLocations.map(
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
            return processConsent(getThing(ds, resource) as Thing);
          }
        ));
      }
    ));

    res.status(200).json(consents.flat());

  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
