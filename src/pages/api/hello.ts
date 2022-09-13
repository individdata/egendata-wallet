// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

import fetchFactory from '../../lib/fetchFactory';
import { fetchPrivateData } from '../../util/oak/solid';

type Data = {
  name: string,
  ssn: string,
  uuid: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await unstable_getServerSession(req, res, authOptions(req, res));

  if (session) {
    // Signed in
    const fetch = fetchFactory({keyPair: session.keys, dpopToken: session.dpop_token});
    const { ssn, fullname, uuid } = await fetchPrivateData(session.seeAlso, fetch);

    res.status(200).json({ 
      name: fullname,
      ssn: ssn,
      uuid: uuid,
    })
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
