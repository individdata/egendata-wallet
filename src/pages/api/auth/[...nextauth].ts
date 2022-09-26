import NextAuth, { NextAuthOptions } from "next-auth"
import SolidProvider from "../../../lib/SolidProvider"
import { fetchProfileData } from "../../../util/oak/solid";
import { NextApiRequest, NextApiResponse } from 'next';
import { JWK } from 'jose';
import { signOut } from "next-auth/react";

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
    debug: process.env.NODE_ENV !== 'production',
    providers: [
      SolidProvider(credentials),
    ],
    callbacks: {
      async jwt({ token, account }) {
        token.webid = token.sub

        // Login?
        if (account) {
          token.dpopToken = account.access_token;
          token.dpopTokenExpiresAt = account.expires_at
          token.keys = account.keys;
        }
        
        // Check if token has expired
        const now = Math.floor(Date.now() / 1000);
        console.log("Token expires in ", token.dpopTokenExpiresAt as number - now)
        if (token.dpopTokenExpiresAt as number < now) {
          signOut()
        }

        return token;
      },  
      async session({ session, token, user }) {
        session.user = user
                
        if (token.webid && !(session.webid || session.storage || session.seeAlso)) {
          session.webid = token.webid as string
          
          const { storage, seeAlso } = await fetchProfileData(session.webid);      
          session.storage = storage
          session.seeAlso = seeAlso
        }  

        // Probably best if we can avoid having the keys on the client.
        // session.dpopToken = token.dpopToken as string;
        // session.keys = token.keys as KeyPair;

        return session;
      },
    },
  }
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions(req, res));
};

export default handler;