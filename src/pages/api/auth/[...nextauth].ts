import { generateKeyPair, exportJWK, KeyLike, JWK, SignJWT } from 'jose';
import { v4 as uuid } from 'uuid';
import NextAuth, { NextAuthOptions } from "next-auth"
//import { usePKCECodeVerifier } from 'next-auth/core/lib/oauth/pkce-handler';
import getAuthorizationUrl from 'next-auth/core/lib/oauth/authorization-url';
import SolidProvider, { getCredentials } from "../../../lib/SolidProvider"
import { fetchPrivateData, fetchProfileData } from "../../../util/oak/solid";
import { NextApiRequest, NextApiResponse } from 'next';

async function createDpopJWT(privateKey: KeyLike, jwkPublicKey: JWK, method: string, url: string) {
  return new SignJWT({
      htu: url,
      htm: method.toUpperCase(),
      jti: uuid(),
  })
    .setProtectedHeader({
      alg: 'ES256',
      jwk: jwkPublicKey,
      typ: "dpop+jwt",
  })
      .setIssuedAt()
      .sign(privateKey, {});
}

const credentials = getCredentials();
// console.log(credentials)

let pkce: string;

function authOptions(req: NextApiRequest, res: NextApiResponse): NextAuthOptions {
  console.log(req.cookies)

  if (req.cookies.pkceCodeVerifier) {
    pkce = req.cookies.pkceCodeVerifier
  }
  
  return {
    debug: true,
//    cookies: {
//      pkceCodeVerifier: {
//        name: 'wallet_next-auth.pkce.code_verifier',
//        options: {},
/*        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: false  // TODO: Unsafe!!
        } */
//      }
//    },
    providers: [
      SolidProvider(credentials),
    ],
    callbacks: {
      async jwt({ token, user, account, profile, isNewUser }) {
        // console.log("All the things: ", token, user, account, profile, isNewUser)
        token.webid = token.sub

        token.pkce = pkce


//        const codeVerifier = cookies?.['wallet_next-auth.pkce.code_verifier']
//        const pkce = usePKCECodeVerifier(codeVerifier, options);

        if (account) { // && !token.jwkPublicKey) {
          //console.log("Generating JWK keypair")
          const keyPair = await generateKeyPair('ES256')
          const jwkPublicKey: JWK = await exportJWK(keyPair.publicKey)
          jwkPublicKey.alg = 'ES256'

          token.jwkPrivateKey = await exportJWK(keyPair.privateKey)
          token.jwkPublicKey = jwkPublicKey

          const tokenURL = `${process.env.NEXT_PUBLIC_IDP_BASE_URL}.oidc/token`
          const tokenMethod = "POST"
          
          const dpop = await createDpopJWT(keyPair.privateKey, jwkPublicKey, tokenMethod, tokenURL)

          const cred = Buffer.from(`${encodeURIComponent(credentials.clientId)}:${encodeURIComponent(credentials.clientSecret)}`).toString('base64')

          const headers = {
            Authorization: `Basic ${cred}`,
            DPoP: dpop,
            'Content-Type': 'application/x-www-form-urlencoded',
          }
          const body = new URLSearchParams({
            grant_type: "authorization_code",
            redirect_uri: "http://localhost:3000/api/auth/callback/solid",
            code: '',
            code_verifier: '',
            client_id: credentials.clientId
          })

          const response = await fetch(tokenURL, {headers: headers, method: tokenMethod, body: body.toString()})
          const json = await response.json()

          token.dpop = json
        }

        /*
        if (account) {
          console.log("Account: ", account);

          token.accessToken = account.access_token;
        }
        */

        console.log("JWT:", token);
        return token;
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.

        session.dpop = token.dpop

        session.jwkPrivateKey = token.jwkPrivateKey as {JWK: any}
        session.jwkPublicKey = token.jwkPublicKey as {JWK: any}

        if (token.sub) {
          session.webid = token.sub

          const { storage, seeAlso } = await fetchProfileData(session.webid);      
          session.storage = storage
          session.seeAlso = seeAlso

          //const { ssn, fullname, uuid } = await fetchPrivateData(seeAlso);
          //session.ssn = ssn
          //session.fullname = fullname
          //session.uuid = uuid

        } else {
          console.warn("Missing webid in token.")
        }

        //console.log(session)
        return session;
      },
    },
  }
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions(req, res));
};

export default handler;
