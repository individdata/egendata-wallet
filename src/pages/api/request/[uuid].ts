import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { getToken } from 'next-auth/jwt';
import { authOptions } from "../auth/[...nextauth]";

import fetchFactory from '../../../lib/fetchFactory';
import { getDatetime, getThingAll, getInteger, getSolidDataset, getStringNoLocale, getThing, getUrl, getUrlAll, Thing, Url } from '@inrupt/solid-client';

type Data = {
    request: {},
    state: 'received' | 'fetching' | 'available' | 'sharing',
    outboundRequests: {},  // TODO: Expand to allow multiple values.
    data: {},
    consents: {},
}

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
  const ts = Date.now();
  const { uuid } = req.query;

  const log = (msg: string) => {
    console.log(`[${uuid} T=${Date.now() - ts}] ${msg}`);
  }

  log("Starting processing of request")

  const session = await unstable_getServerSession(req, res, authOptions(req, res));

  if (session) {
    // Signed in
    const { uuid } = req.query;

    const token = await getToken({ req });
    const fetch = fetchFactory({keyPair: token?.keys, dpopToken: token?.dpopToken});

    log("Fetching base data")
    // Fetch base data about request.
    const requestUrl = `${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}requests/subject/${uuid}`;
    const requestDS = await getSolidDataset(requestUrl, { fetch });
    const requestThing = getThing(requestDS, requestUrl) as Thing;
    const request = processRequest(requestThing);

    log("Sending response")
    res.status(200).json(request);
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
  log("Finished")
}
