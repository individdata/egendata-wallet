import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl, IntlProvider } from 'react-intl';
import LOCALES from '../react-intl/locales';

import Layout from "../components/layout";
import styles from './index.module.css'
import OakLogo from '../components/header/oakLogo';
import FlowBox from '../components/flowBox';
import Button from '../components/ui/Button';
import { doLogin } from '../store/slices/authSlice';
import { RootState } from '../store/store';
import { useRouter, NextRouter, Router } from "next/router";
import { faSignIn } from '@fortawesome/free-solid-svg-icons';

import { useSession, signIn } from 'next-auth/react';
import React from 'react';


const Home: NextPage = () => {
  const {data: session, status} = useSession();
  const router = useRouter();

  if (status === 'authenticated') {
    router.push('/home')
  }

  return (
    <Container>
      <Button
        preset="medium"
        type="primary"
        onPress={() => signIn('solid')}
        >
        Login
      </Button>
      <span style={{color: 'deeppink'}}>
        {status}
      </span>
    </Container>
  )          
}

export default Home
