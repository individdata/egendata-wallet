import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { getToken } from 'next-auth/jwt';
import { authOptions } from "./../auth/[...nextauth]";

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
  const session = await unstable_getServerSession(req, res, authOptions(req, res));

  if (session) {
    // Signed in
    const { uuid } = req.query;

    const token = await getToken({ req });
    const fetch = fetchFactory({keyPair: token?.keys, dpopToken: token?.dpopToken});

    // Fetch base data about request.
    const requestUrl = `${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}requests/subject/${uuid}`;
    const requestDS = await getSolidDataset(requestUrl, { fetch });
    const requestThing = getThing(requestDS, requestUrl) as Thing;
    const request = processRequest(requestThing);

    // Fetch list of all outbound request(s) that are associated with the request.
    // TODO: Should we use id of requests/provider instead of requestId of consents/provider
    const outboundRequestUrl = `${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}requests/provider/`
    const outboundRequestsThing = getThing(await getSolidDataset(outboundRequestUrl, { fetch }), outboundRequestUrl) as Thing;
    const outboundRequestsUrls = getUrlAll(outboundRequestsThing, 'http://www.w3.org/ns/ldp#contains');
    const outboundRequests = (await Promise.all(outboundRequestsUrls.map(async (url) => {
        const r = getThing(await getSolidDataset(url, { fetch }), url) as Thing;
        const rv = {
          url: r.url,
          id: getStringNoLocale(r, 'https://pod-test.egendata.se/schema/core/v1#id'),
//          dataLocation: getStringNoLocale(r, 'https://pod-test.egendata.se/schema/core/v1#dataLocation'),
        };
        // console.log(rv.id, uuid, rv.id === uuid);
        return rv;
    }))).filter((obj) => obj && obj.id === uuid).map(({id, ...rest}) => rest);

    // Check if data has been added.
    const url = `${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}data/`;
    const r = getThing(await getSolidDataset(url, { fetch }), url);
    const urls = getUrlAll(r, 'http://www.w3.org/ns/ldp#contains');
    const data = (await Promise.all(urls.map(async (url) => {
      const r = getThing(await getSolidDataset(url, { fetch }), url) as Thing;
      if (r) {
        const rv = {
          url: url,
          id: getStringNoLocale(r, 'https://pod-test.egendata.se/schema/core/v1#requestId'),
        }
        // console.log(rv);
        return rv;
      }
    }))).filter((item) => item?.id === uuid).map(({id, ...rest}) => rest);

    // Fetch consents associated with the request.
    const consumerConsentsUrl = `${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}consents/consumer/`;    
    const consumerConsentsThing = getThing(await getSolidDataset(consumerConsentsUrl, { fetch }), consumerConsentsUrl);
    const consumerConsentsUrls = getUrlAll(consumerConsentsThing, 'http://www.w3.org/ns/ldp#contains');
    const consumerConsent = (await Promise.all(consumerConsentsUrls.map(async (url) => {
      const r = getThing(await getSolidDataset(url, { fetch }), url) as Thing;
      const rv = {
        url: url,
        id: getStringNoLocale(r, 'https://pod-test.egendata.se/schema/core/v1#requestId'),
      }
      return rv;
    }))).filter((item) => item.id === uuid).map(({id, ...rest}) => rest);

    // TODO: Seriously bug friendly code below.
    let state = "received";
    if (outboundRequests.length > 0) {
      state = "fetching";
    }
    if (data.length > 0) {
      state = "available";
    }
    if (consumerConsent.length > 0) {
      state = "sharing";
    }


    res.status(200).json({request: request, deps: outboundRequests, data: data, consents: consumerConsent, state: state});
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
