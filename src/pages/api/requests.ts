// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

import fetchFactory from '../../lib/fetchFactory';
import { fetchPrivateData } from '../../util/oak/solid';

import { getSolidDataset, getThing, getUrlAll, Thing } from '@inrupt/solid-client';

type Data = {
  urls: string[],
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
        console.log(r);
        const urls = getUrlAll(r, 'http://www.w3.org/ns/ldp#contains')

        res.status(200).json({ 
          urls: urls
        })

    } else {
        res.status(200).json({urls: []})
    }

  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
