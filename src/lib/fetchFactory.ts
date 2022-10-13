import { importJWK, JWK, SignJWT } from 'jose';
import { v4 as uuid } from 'uuid';

async function generateDPoP(jwkPrivateKey: JWK, jwkPublicKey: JWK, method: string, url: string) {
  jwkPrivateKey.alg = 'ES256';
  const privateKey = await importJWK(jwkPrivateKey);

  return new SignJWT({
    htu: url,
    htm: method.toUpperCase(),
    jti: uuid(),
  })
    .setProtectedHeader({
      alg: 'ES256',
      jwk: jwkPublicKey,
      typ: 'dpop+jwt',
    })
    .setIssuedAt()
    .sign(privateKey);
}

type fetchFactoryProps = {
  keyPair:
    | {
        privateKey: JWK;
        publicKey: JWK;
      }
    | unknown;
  dpopToken: string | unknown;
};

export interface fetchInterface {
  (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
}

export default function fetchFactory(props: fetchFactoryProps): fetchInterface {
  if (!(props.keyPair && props.dpopToken)) throw 'Missing keyPair and/or DPoP access token.';

  const { privateKey, publicKey } = props.keyPair as { privateKey: JWK; publicKey: JWK };
  const { dpopToken } = props;

  return async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response> => {
    init = init || {};
    init.method = init.method || 'GET';

    const dpopHeader = await generateDPoP(privateKey, publicKey, init.method, input.toString());

    /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
    init.headers = new Headers(init.headers || {});
    init.headers.set('Authorization', `DPoP ${dpopToken}`);
    init.headers.set('DPoP', dpopHeader);

    return await fetch(input, init);
  };
}
