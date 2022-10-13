import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { getToken } from 'next-auth/jwt';
import { authOptions } from '../auth/[...nextauth]';

import fetchFactory from '../../../lib/fetchFactory';
import { changeToFetching, changeToSharing, getRequestWithState } from '../../../lib/requestStateChanger';

type RequestInfo = {
  outbound: {} | {}[];
  data: {};
  consents: {};
};

type RequestState = 'received' | 'fetching' | 'available' | 'sharing';

export type ResponseData =
  | {
      url: string;
      type: string;
      documentTitle: string;
      documentType: string;
      id: string;
      providerWebId: string;
      purpose: string;
      requestorWebId: string;
      returnUrl: string;
      created: Date;
      state: RequestState;
      related: RequestInfo;
    }
  | {
      state: RequestState;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const session = await unstable_getServerSession(req, res, authOptions(req, res));

  if (!session) {
    res.status(401).end();
    return;
  }

  const token = await getToken({ req });
  const fetch = fetchFactory({ keyPair: token?.keys, dpopToken: token?.dpopToken });

  if (req.method === 'GET') {
    const { id } = req.query;

    const requestURL = new URL(`${session.storage}${process.env.EGENDATA_PATH_FRAGMENT}requests/subject/${id}`);

    let response;
    try {
      response = await getRequestWithState(requestURL, fetch);
    } catch (error: any) {
      console.error(error);
      res.status(500).end();
      return;
    }

    res.status(200).json(response);
  } else if (req.method === 'PATCH') {
    const { id } = req.query;

    if (!['fetching', 'sharing'].includes(req.body.new_state)) {
      res.status(400).end();
      return;
    }

    if (req.body.new_state === 'fetching') {
      const baseURL = new URL(process.env.EGENDATA_PATH_FRAGMENT as string, session.storage);

      const requestURL = new URL(`requests/subject/${id}`, baseURL);

      try {
        await changeToFetching(session.webid, requestURL, fetch);
      } catch (error: any) {
        console.log('Something went wrong when updating state to fetching.', error);
        res.status(500).end();
        return;
      }

      console.log(`Accepted consent to fetch for ${id}`);

      // res.status(201).json([subjectRequest, consentProvider, dataStore, notification]);
      res.status(201).json({ state: 'fetching' });
    }

    if (req.body.new_state === 'sharing') {
      const baseURL = new URL(process.env.EGENDATA_PATH_FRAGMENT as string, session.storage);

      const requestURL = new URL(`requests/subject/${id}`, baseURL);

      // let subjectRequest, consentProvider, dataStore, notification;

      try {
        await changeToSharing(session.webid, requestURL, fetch);
      } catch (error: any) {
        console.log('Something went wrong when updating state to sharing.', error);
        res.status(500).end();
        return;
      }

      console.log(`Accepted consent to share for ${id}`);

      // res.status(201).json([subjectRequest, consentProvider, dataStore, notification]);
      res.status(201).json({ state: 'sharing' });
    }
  } else {
    // Invalid method
    res.status(405);
  }
  res.end();
  // log("Finished")
}
