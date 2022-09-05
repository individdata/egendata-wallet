import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';
import { TokenSet } from 'openid-client';

export interface SolidProfile extends Record<string, any> {
  sub: string,
  aud: string,
  webid: string,
  iss: string,
  azp: string,
  iat: number,
  exp: number,
  name: string,
  email: string,
}

export function getCredentials() {
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
      console.log("Registration response: ", json)
      options.clientId = json.client_id
      options.clientSecret = json.client_secret
      console.log(options);
      return options
    },
    (error) => {
      console.log(error);
    }
  )
  return options

}


export default function SolidProvider<P extends SolidProfile>(options: OAuthUserConfig<P>): OAuthConfig<P> {
  return {
    id: "solid",
    name: "Solid",
    type: "oauth",
    wellKnown: `${process.env.NEXT_PUBLIC_IDP_BASE_URL}.well-known/openid-configuration`,
    authorization: { params: { scope: "openid offline_access webid" } },
    idToken: true,
    checks: ["pkce", "state"],  // TODO: Is "state" useful?
    client: {
      authorization_signed_response_alg: 'ES256',
      id_token_signed_response_alg: 'ES256',
    },
    token: {
      url: `${process.env.NEXT_PUBLIC_IDP_BASE_URL}.oidc/token`,
      async request( { provider, params, checks, client }) {
        const tokens = new TokenSet()

        console.log("provieder: ", provider)
        console.log("params: ", params)
        console.log("checks: ", checks)
        console.log("client: ", client)

        return tokens
      }
    },
    // token: { 
    //   async request(context) {
    //     console.log("checks", context.checks)
    //     console.log("client.metadata", context.client.metadata)
    //     context.client
    //     const tokens = { test: "faketokenvalue"}
    //     return { tokens }
    //   }
    // },
    profile(profile) {
      console.log(profile)
      return {
        id: profile.sub,
        webid: profile.sub,
        name: profile.name,
        email: profile.email,
        sub: profile.sub,
        aud: profile.aud,
        iss: profile.iss,
        azp: profile.azp,
        iat: profile.iat,
        exp: profile.exp,
      }
    },
    options
  }
}
