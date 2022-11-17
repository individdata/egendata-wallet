import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { Thing, getSolidDataset, getStringNoLocale, getThing, getUrl } from '@inrupt/solid-client';

type Data = {
  name: string;
  logo: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await unstable_getServerSession(req, res, authOptions(req, res));

  if (!session) {
    res.status(401).end();
    return;
  }

  if (req.method === 'GET') {
    const { webid } = req.query;

    const requestURL = new URL(webid as string);

    const thing = getThing(await getSolidDataset(requestURL.toString(), { fetch }), requestURL.toString()) as Thing;
    const name = getStringNoLocale(thing, 'http://xmlns.com/foaf/0.1/name');
    const logo = getUrl(thing, 'http://xmlns.com/foaf/0.1/logo');

    res.status(200).json({
      name: name!,
      logo: logo!,
    });
  } else {
    res.status(405).end();
  }
  res.end();
}
