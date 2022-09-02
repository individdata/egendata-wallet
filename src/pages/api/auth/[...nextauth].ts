import { generateKeyPair, exportJWK, KeyLike, JWK, SignJWT } from 'jose';
import { v4 as uuid } from 'uuid';
import { access } from "fs";
import NextAuth, { NextAuthOptions } from "next-auth"
import SolidProvider, { getCredentials } from "../../../lib/SolidProvider"
import { fetchPrivateData, fetchProfileData } from "../../../util/oak/solid";
import { randomBytes } from 'crypto';

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

//const credentials = getCredentials();
//console.log(credentials)
const credentials = {
  "clientId": "jDVWBHkMUwcEKTQZMq_md",
  "clientSecret": "tiHtr_L02WNM-mu6Sxe0oTshodG5txzor1K95of9sUblmwUKVIQO13ebgwSaDbTSFC9Gjxy1wvL_iw5zfxNkyA"
}
/** 
{
  "application_type": "web",
  "grant_types": [
      "authorization_code",
      "refresh_token"
  ],
  "id_token_signed_response_alg": "ES256",
  "post_logout_redirect_uris": [],
  "require_auth_time": false,
  "response_types": [
      "code"
  ],
  "subject_type": "public",
  "token_endpoint_auth_method": "client_secret_basic",
  "introspection_endpoint_auth_method": "client_secret_basic",
  "revocation_endpoint_auth_method": "client_secret_basic",
  "require_signed_request_object": false,
  "request_uris": [],
  "client_id_issued_at": 1662104086,
  "client_id": "tGDgflE88GrZEYa95OFKt",
  "client_name": "Egendata Wallet",
  "client_secret_expires_at": 0,
  "client_secret": "YqHPr95eil9ID0cid5ka-gWcUpDKAMG5xOZWZk5Yz07_6jYMSS751r6_tRcFGksYLmql5T5bmMIHUMpoY8MzWQ",
  "redirect_uris": [
      "http://localhost:3000/api/auth/callback/solid"
  ],
  "registration_client_uri": "https://idp-test.egendata.se/.oidc/reg/tGDgflE88GrZEYa95OFKt",
  "registration_access_token": "3FCHVUeN3hcRU1wE2YCmStgGjRSlRJFCdB7BP4Pa8oR"
}
*/


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    SolidProvider(credentials),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("All the things: ", token, user, account, profile, isNewUser)
      token.webid = token.sub

      if (account && !token.jwkPrivateKey) {
        generateKeyPair('ES256')
          .then((keyPair) => {
            token.jwkPrivateKey = keyPair.privateKey
            return exportJWK(keyPair.publicKey)})
          .then((pk) => {
            pk.alg = 'ES256'
            token.jwkPublicKey = pk
          })
          .then(() => {
            const tokenURL = "https://idp-test.egendata.se/.oidc/token"
            const tokenMethod = "POST"
            return createDpopJWT(token.jwkPrivateKey as KeyLike, token.jwkPublicKey as JWK, tokenMethod, tokenURL)
              .then((dpop) => {
                const cred = `${encodeURIComponent(credentials.clientId)}:${encodeURIComponent(credentials.clientSecret)}`
                console.log("Credentials: ", cred)
                const headers = {
                  Authorization: `Basic ${Buffer.from(cred).toString('base64')}`,
                  dpop: dpop,
                  'Content-Type': 'application/x-www-form-urlencoded',
                }
                const body = new URLSearchParams({
                  grant_type: "client_credentials",
                  scope: "webid",
                })

                console.log(headers, body)

                return fetch(tokenURL, {
                  headers: headers, 
                  method: tokenMethod, 
                  body: body.toString(),
                })
                  .then((res) => res.json())
                  .then((json) => {
                    token.dpop = json
                    console.log("New DPoP compatible token", json)
                  })
            })
          })
      }

      if (account) {
        console.log("Account: ", account);

        token.accessToken = account.access_token;
      }

      console.log("JWT:", token);
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.

      session.dpop = token.dpop

      if (token.sub) {
        session.webid = token.sub

        const { storage, seeAlso } = await fetchProfileData(session.webid);        
        session.storage = storage

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

export default NextAuth(authOptions)
