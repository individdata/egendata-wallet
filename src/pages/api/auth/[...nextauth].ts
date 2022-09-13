import NextAuth, { NextAuthOptions } from "next-auth"
import SolidProvider from "../../../lib/SolidProvider"
import { fetchProfileData } from "../../../util/oak/solid";
import { NextApiRequest, NextApiResponse } from 'next';
import { JWK } from 'jose';

type KeyPair = {
  privateKey: JWK,
  publicKey: JWK
}

// Call the registration endpoint.
// openid-client has some support for this? 
// See https://github.com/panva/node-openid-client/blob/main/docs/README.md#clientregistermetadata-other
export function registerCredentials() {
  const options = { clientId: '', clientSecret: ''};
  const body = {
    "client_name": "Egendata Wallet",
    "application_type": "web",
    "redirect_uris": [
      "http://localhost:3000/api/auth/callback/solid"
    ],
    "subject_type": "public",
    "token_endpoint_auth_method": "client_secret_basic",
    "id_token_signed_response_alg": "ES256",
    "grant_types": [
      "authorization_code",
      "refresh_token",
      "client_credentials"
    ]
  }

  const response = fetch(`${process.env.NEXT_PUBLIC_IDP_BASE_URL}.oidc/reg`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(body),
  }).then((res) => res.json()).then(
    (json) => {
      options.clientId = json.client_id
      options.clientSecret = json.client_secret

      return options
    },
    (error) => {
      console.log(error);
    }
  )
  return options

}

const credentials = registerCredentials();

export function authOptions(req: NextApiRequest, res: NextApiResponse): NextAuthOptions {
  return {
    debug: true,
    providers: [
      SolidProvider(credentials),
    ],
    callbacks: {
      async jwt({ token, account }) {
        token.webid = token.sub

        // Login?
        if (account) {
          token.dpop_token = account.access_token;
          token.keys = account.keys;
        }

        return token;
      },
      async session({ session, token, user }) {
        // Pass on to the client.

        session.dpop_token = token.dpop_token as string;
        session.keys = token.keys as KeyPair;

        session.user = user

        if (token.sub) {
          session.webid = token.sub

          const { storage, seeAlso } = await fetchProfileData(session.webid);      
          session.storage = storage
          session.seeAlso = seeAlso
        }

        return session;
      },
    },
  }
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions(req, res));
};

export default handler;