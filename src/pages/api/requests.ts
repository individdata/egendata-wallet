// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

import fetchFactory from '../../lib/fetchFactory';

import { getSolidDataset, getThing, getUrl, getUrlAll, Thing, getStringNoLocale, getDatetime } from '@inrupt/solid-client';

type Data = {
  requests: Object[],
}

async function processRequest(thing: Thing) {
  return {
    type: getUrl(thing, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') ?? '',
    documentTitle: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#documentTitle') ?? '',
    documentType: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#documentType') ?? '',
    id: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#id') ?? '',
    providerWebId: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#providerWebId') ?? '',
    purpose: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#purpose') ?? '',
    requstorWebId: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#requestorWebId') ?? '',
    returnUrl: getStringNoLocale(thing, 'https://pod-test.egendata.se/schema/core/v1#returnUrl') ?? '',
    created: (getDatetime(thing, 'http://purl.org/dc/terms/created') ?? new Date()).toISOString(),  // TODO: Missing dates?
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
    const resource = `${session.storage}egendata/requests/subject/`;
    const ds = await getSolidDataset(resource, { fetch })

    if (ds) {
      const r = getThing(ds, resource) as Thing;
      const urls = getUrlAll(r, 'http://www.w3.org/ns/ldp#contains')

      const requests = await Promise.all(urls.map(async (url) => processRequest(getThing(await getSolidDataset(url, { fetch }), url))));

      res.status(200).json({ 
        requests: requests
      })

    } else {
      res.status(200).json({requests: []})
    }

  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
