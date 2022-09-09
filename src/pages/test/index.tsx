/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';
import { Container, Stack } from '@mui/material';
import { importJWK, JWK, SignJWT } from 'jose';
import { v4 as uuid } from 'uuid';
import { useSession } from 'next-auth/react';

async function createDpopJWK(jwkPrivateKey: JWK, jwkPublicKey: JWK, method: string, url: string) {
  jwkPrivateKey.alg = 'ES256'
  const privateKey = await importJWK(jwkPrivateKey)

  return new SignJWT({
    htu: url,
    htm: method.toUpperCase(),
    jti: uuid(),
  })
    .setProtectedHeader({
      alg: 'ES256',
      jwk: jwkPublicKey,
      typ: 'dpop+jwt'
    })
    .setIssuedAt()
    .sign(privateKey)
}

function HomePage() {
  const {data: session, status} = useSession();
  const [privateData, setPrivateData] = useState('')

  const resourceURI = session?.seeAlso ?? "";
  const resourceMethod = 'GET';

  useEffect(() => {
    if (session) {
      createDpopJWK(session.keys.privateKey, session.keys.publicKey, resourceMethod, resourceURI)
        .then((dpop) => {
          const headers = new Headers({
            Authorization: `DPoP ${session.dpop_token}`,
            DPoP: dpop,
          });
          
          fetch(resourceURI, {headers: headers, method: resourceMethod})
            .then((res) => res.text())
            .then((body) => setPrivateData(body))
        }
      )
    }
  }, [session])

  return (
    <Container>
      <Stack direction="column">
        <div style={{ color: 'white' }}>
          DPoP-token: <span  style={{ color: 'deeppink' }}>{ session?.dpop_token }</span>
        </div>

        <div style={{ color: 'white' }}>Resource URI: { resourceURI }<br />
          <pre>
            <code  style={{ color: 'deeppink' }}>{ privateData }</code>
          </pre>
        </div>
      </Stack>
    </Container>
  );
}

export default HomePage;
