// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { getToken } from 'next-auth/jwt';
import { authOptions } from './auth/[...nextauth]';

import fetchFactory from '../../lib/fetchFactory';
import { Thing, getSolidDataset, getStringNoLocale, getThing } from '@inrupt/solid-client';
import logger from '../../lib/logger';

type Data =
  | {
      name: string;
      ssn: string;
      uuid: string;
    }
  | { error: number; message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await unstable_getServerSession(req, res, authOptions(req, res));

  if (session) {
    // Signed in
    const token = await getToken({ req });

    const fetch = fetchFactory({ keyPair: token?.keys, dpopToken: token?.dpopToken });

    try {
      // Fetch basic data from provider request
      const ds = await getSolidDataset(session.seeAlso, { fetch });
      const requestThing = getThing(ds, `${session.seeAlso}#me`) as Thing;
      const firstName = getStringNoLocale(requestThing, 'http://xmlns.com/foaf/0.1/firstName') ?? '';
      const lastName = getStringNoLocale(requestThing, 'http://xmlns.com/foaf/0.1/lastName') ?? '';
      const ssn =
        getStringNoLocale(requestThing, 'https://pod-test.egendata.se/schema/core/v1#dataSubjectIdentifier') ?? '';
      const uuid = getStringNoLocale(requestThing, 'https://pod-test.egendata.se/schema/core/v1#uuid') ?? '';

      res.status(200).json({
        name: `${firstName} ${lastName}`,
        ssn,
        uuid,
      });
    } catch (error: any) {
      logger.error(error, 'Failed to fetch user details.');
      res.status(500).json({ error: 500, message: 'Failed to fetch user details.' }).end();
      return;
    }
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
