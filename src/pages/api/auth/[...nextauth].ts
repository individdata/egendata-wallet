import NextAuth, { NextAuthOptions } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWK } from 'jose';
import SolidProvider from '../../../lib/SolidProvider';
import { Thing, getSolidDataset, getStringNoLocale, getThing, getUrl } from '@inrupt/solid-client';

import logger from '../../../lib/logger';

type KeyPair = {
  privateKey: JWK;
  publicKey: JWK;
};

export async function fetchProfileData(webId: string) {
  const profile = getThing(await getSolidDataset(webId), webId) as Thing;
  const name = getStringNoLocale(profile, 'http://xmlns.com/foaf/0.1/name') ?? '';
  const storage = getUrl(profile, 'http://www.w3.org/ns/pim/space#storage') ?? '';
  const seeAlso = getUrl(profile, 'http://www.w3.org/2000/01/rdf-schema#seeAlso') ?? '';
  return { name, storage, seeAlso };
}

// Call the registration endpoint.
// openid-client has some support for this?
// See https://github.com/panva/node-openid-client/blob/main/docs/README.md#clientregistermetadata-other
export function registerCredentials() {
  logger.info('Registering new application credentials.');

  const options = { clientId: '', clientSecret: '' };
  const body = {
    client_name: 'Egendata Wallet',
    application_type: 'web',
    redirect_uris: [new URL('/api/auth/callback/solid', process.env.NEXTAUTH_URL).toString()],
    subject_type: 'public',
    token_endpoint_auth_method: 'client_secret_basic',
    id_token_signed_response_alg: 'ES256',
    grant_types: ['authorization_code', 'refresh_token'],
  };

  logger.info(body, 'Preparing application credentials registration.');

  const response = fetch(new URL('.oidc/reg', process.env.NEXT_PUBLIC_IDP_BASE_URL), {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then(
      (json) => {
        options.clientId = json.client_id;
        options.clientSecret = json.client_secret;

        return options;
      },
      (error) => {
        logger.error(error, 'Failed to register application credentials with IDP.');
      },
    );
  return options;
}

const credentials = registerCredentials();

export function authOptions(req: NextApiRequest, res: NextApiResponse): NextAuthOptions {
  return {
    debug: process.env.NODE_ENV !== 'production',
    providers: [SolidProvider(credentials)],
    callbacks: {
      async jwt({ token, account }) {
        token.webid = token.sub;

        // Login?
        if (account) {
          token.dpopToken = account.access_token;
          token.dpopTokenExpiresAt = account.expires_at;
          token.keys = account.keys;
        }

        // Check if token has expired
        const now = Math.floor(Date.now() / 1000);
        logger.debug(`Token expires in ${(token.dpopTokenExpiresAt as number) - now}`);
        // if ((token.dpopTokenExpiresAt as number) < now) {
        //   signOut();
        // }

        return token;
      },
      async session({ session, token, user }) {
        session.user = user;

        if (token.webid && !(session.webid || session.storage || session.seeAlso)) {
          session.webid = token.webid as string;

          const { storage, seeAlso } = await fetchProfileData(session.webid);
          session.storage = storage;
          session.seeAlso = seeAlso;
        }

        return session;
      },
    },
    events: {
      signIn: (user) => {
        logger.info(`User successfully signed in, ${user.user.webid} (${user.account!.provider}).`);
      },
      signOut: (token) => {
        logger.info(`Signing out user ${token.token.webid}.`);
      },
    },
    logger: {
      error(code, metadata) {
        logger.error(metadata, code);
      },
      warn(code) {
        logger.warn(code);
      },
      debug(code, metadata) {
        logger.debug(metadata, code);
      },
    },
  };
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions(req, res));
}

export default handler;
