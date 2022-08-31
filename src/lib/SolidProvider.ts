import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';

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

export default function SolidProvider<P extends SolidProfile>(): OAuthConfig<P> {
  let options: OAuthUserConfig<P> = { clientId: '', clientSecret: '' };
  const response = fetch("https://idp-test.egendata.se/.oidc/reg", {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: '{"redirect_uris":["http://localhost:3000/api/auth/callback/solid"]}',
  }).then((res) => res.json()).then(
    (json) => {
      options.clientId = json.client_id
      options.clientSecret = json.client_secret
      console.log(options);
    },
    (error) => {
      console.log(error);
    }
  )

  return {
    id: "solid",
    name: "Solid",
    type: "oauth",
    wellKnown: "https://idp-test.egendata.se/.well-known/openid-configuration",
    authorization: { params: { scope: "openid webid" } },
    idToken: true,
    checks: ["pkce", "state"],
    client: {
      authorization_signed_response_alg: 'ES256',
      id_token_signed_response_alg: 'ES256',
    },
    profile(profile) {
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
