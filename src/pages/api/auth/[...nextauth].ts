import NextAuth, { NextAuthOptions } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { JWK } from 'jose';
import SolidProvider from '../../../lib/SolidProvider';
import { Thing, getSolidDataset, getStringNoLocale, getThing, getUrl } from '@inrupt/solid-client';

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
  const options = { clientId: '', clientSecret: '' };
  const body = {
    client_name: 'Egendata Wallet',
    application_type: 'web',
    redirect_uris: ['http://localhost:3000/api/auth/callback/solid'],
    subject_type: 'public',
    token_endpoint_auth_method: 'client_secret_basic',
    id_token_signed_response_alg: 'ES256',
    grant_types: ['authorization_code', 'refresh_token', 'client_credentials'],
  };

  const response = fetch(`${process.env.NEXT_PUBLIC_IDP_BASE_URL}.oidc/reg`, {
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
        console.log(error);
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
        console.log('Token expires in ', (token.dpopTokenExpiresAt as number) - now);
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
      signOut: (token) => {
        console.log(`Signing out (${token})`);
      },
    },
  };
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions(req, res));
}

export default handler;
