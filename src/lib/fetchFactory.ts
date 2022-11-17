import { JWK, SignJWT, importJWK } from 'jose';
import { v4 as uuid } from 'uuid';

import { logger as parentLogger } from './logger';

const logger = parentLogger.child({ module: 'fetchFactory' });

export type generateDPoPProps = {
  jwkPrivateKey: JWK;
  jwkPublicKey: JWK;
  method: string;
  url: string;
};

export async function generateDPoP(props: generateDPoPProps) {
  const { jwkPrivateKey, jwkPublicKey, method, url } = props;
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

export type fetchFactoryProps = {
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

export default function fetchFactory(props: fetchFactoryProps, generator = generateDPoP): fetchInterface {
  if (!(props.keyPair && props.dpopToken)) throw 'Missing keyPair and/or DPoP access token.';

  const { privateKey, publicKey } = props.keyPair as { privateKey: JWK; publicKey: JWK };
  const { dpopToken } = props;

  return async (input, init?): Promise<Response> => {
    init = init || {};
    init.method = init.method || 'GET';

    const dpopHeader = await generator({
      jwkPrivateKey: privateKey,
      jwkPublicKey: publicKey,
      method: init.method,
      url: input.toString(),
    });

    /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
    init.headers = new Headers(init.headers || {});
    init.headers.set('Authorization', `DPoP ${dpopToken}`);
    init.headers.set('DPoP', dpopHeader);

    logger.debug(`Fetching [DPoP] (${input})`);
    const rv = await fetch(input, init);
    if (rv.ok) {
      logger.debug(`Successfully fetched ${input} (${init.method}).`);
    } else {
      logger.debug(rv, `Failed to fetch ${input} (${init.method}) - status ${rv.status}.`);
    }
    return rv;
  };
}
