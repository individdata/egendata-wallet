/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';
import { useRouter, NextRouter } from "next/router";
import Layout from '../../components/layout';
import { Grid } from '@mui/material';
import { exportJWK, generateKeyPair, JWK, KeyLike, SignJWT } from 'jose';
import { v4 as uuid } from 'uuid';
import { useSession } from 'next-auth/react';
import { getCredentials } from '../../lib/SolidProvider';

async function createDpopJWK(privateKey: KeyLike, jwkPubKey: JWK, method: string, url: string) {
  return new SignJWT({
    htu: url,
    htm: method.toUpperCase(),
    jti: uuid(),
  })
    .setProtectedHeader({
      alg: 'ES256',
      jwk: jwkPubKey,
      typ: 'dpop+jwt'
    })
    .setIssuedAt()
    .sign(privateKey)
}


function HomePage() {
  const {data: session, status} = useSession();
  const [keyPair, setKeyPair] = useState<any>();
  const [jwkPubKey, setJwkPubKey] = useState<any>();
  const [dpopValue, setDpopValue] = useState('');
  const [dpopToken, setDpopToken] = useState<any>();

  const resourceURI = "https://pod-test.egendata.se/6f2ac7a7-6a7e-426a-9b22-4b88fed17896/egendata/data/";
  const resourceMethod = 'GET'

  useEffect(() => {
    console.log("Session changed...", session)
    // const c = getCredentials();

    setDpopToken(session?.dpop);

    if(!keyPair) {
      console.log("Generate Key Pair")
      generateKeyPair('ES256')
        .then((kp) => {
          setKeyPair(kp)
          console.log(kp)
        })
    }
  }, [session])

  /*
  useEffect(() => {
    if (!keyPair) { return }
    
    console.log("Prepare Public Key")
    exportJWK(keyPair.publicKey)
      .then((pk) => {
        pk.alg = 'ES256'
        setJwkPubKey(pk)
        console.log(pk)
      })
  }, [keyPair]);

  useEffect(() => {
    if (!jwkPubKey) { return}

    console.log("Generate DPoP value")
    createDpopJWK(keyPair.privateKey, jwkPubKey, resourceMethod, resourceURI)
      .then((dpop) => {
        setDpopValue(dpop)
        console.log(`DPoP : ${dpop}`)
      })
  }, [jwkPubKey])
  */


  return (
    <Layout>
      <Grid container sx={{ color: 'deeppink' }}>
        <p>
          { status }
        </p>
        <p><span>accessToken of DPoP type</span><br />
          { dpopToken }
        </p>
        <p><span>DPoP for {resourceURI} with {resourceMethod}</span><br />
          { dpopValue }
        </p>

        <p><span>curl command</span><br />
        { `curl -k -X ${resourceMethod} -H "Authorization: DPoP ${session?.accessToken}" -H "dpop: ${dpopValue}" ${resourceURI}` }
        </p>
      </Grid>
    </Layout>
  );
}

export default HomePage;
