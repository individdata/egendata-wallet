// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { getToken } from 'next-auth/jwt';
import { authOptions } from './auth/[...nextauth]';

import fetchFactory from '../../lib/fetchFactory';
import { Thing, getSolidDataset, getStringNoLocale, getThing } from '@inrupt/solid-client';

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await unstable_getServerSession(req, res, authOptions(req, res));

  if (session) {
    // Signed in
    const token = await getToken({ req });

    const fetch = fetchFactory({ keyPair: token?.keys, dpopToken: token?.dpopToken });

    // Fetch basic data from provider request
    const ds = await getSolidDataset(session.seeAlso, { fetch });
    const requestThing = getThing(ds, `${session.seeAlso}#me`) as Thing;
    const firstName = getStringNoLocale(requestThing, 'http://xmlns.com/foaf/0.1/firstName');
    const lastName = getStringNoLocale(requestThing, 'http://xmlns.com/foaf/0.1/lastName');

    res.status(200).json({
      name: `${firstName} ${lastName}`,
    });
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
