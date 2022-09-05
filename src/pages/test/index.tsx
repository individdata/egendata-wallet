/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';
import { useRouter, NextRouter } from "next/router";
import Layout from '../../components/layout';
import { Grid } from '@mui/material';
import { importJWK, exportJWK, generateKeyPair, JWK, KeyLike, SignJWT } from 'jose';
import { v4 as uuid } from 'uuid';
import { useSession } from 'next-auth/react';
import { getCredentials } from '../../lib/SolidProvider';

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

  const resourceURI = session?.seeAlso;
  const resourceMethod = 'GET';

  useEffect(() => {

    console.log(session)

    if (session) {
      createDpopJWK(session.jwkPrivateKey as KeyLike, session.jwkPublicKey as JWK, resourceMethod, resourceURI).then(
      (dpop) => {
        const headers = new Headers({
          Authorization: `DPoP ${session.dpop.access_token}`,
          DPoP: dpop,
        })
        
        fetch(resourceURI, {headers: headers, method: resourceMethod}).then((res) => console.log(res.data))
      }
      )
    }
      

  }, [session])

  return (
    <Layout>
      <Grid container sx={{ color: 'deeppink' }}>
      </Grid>
    </Layout>
  );
}

export default HomePage;
