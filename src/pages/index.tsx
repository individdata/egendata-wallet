import React from 'react';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';
import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import styles from './index.module.css';
import OakLogo from '../components/OakLogo/OakLogo';
import Link from '../lib/Link';

function Index() {
  const router = useRouter();

  return (
    <Grid container className={styles.container}>
      <Grid item xs={12} md={6} className={styles.left}>
        <article>
          <Image className={styles.logo} alt="left-logo" src="/images/oak-green.png" width="54" height="80" />
          <h1 className={styles.title}>
            <FormattedMessage
              id="aeoy6U"
              defaultMessage="Your data in your control"
              description="Index page main text."
            />
          </h1>
          <h3 className={styles.subtitle}>
            <FormattedMessage
              id="6RE9ba"
              defaultMessage="Project Oak is a governmental initiative that allows you to store and transfer digital information between public and private organizations."
              description="Index page main subtitle."
            />
          </h3>
        </article>
      </Grid>
      <Grid item xs={12} md={6} className={styles.right}>
        <header>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              paddingTop: 16,
            }}
          >
            <OakLogo />
          </div>
        </header>
        <main>
          <Grid container flexDirection="column">
            <Grid item>
              <Typography variant="h1" component="h1" fontSize={40}>
                <FormattedMessage
                  id="DF7L5F"
                  defaultMessage="Welcome to Egendata"
                  description="Index page welcome text."
                />
              </Typography>
            </Grid>
            <Grid item marginTop={8} marginBottom={4}>
              <Button
                size="large"
                color="primary"
                variant="contained"
                sx={{ fontSize: '1.25rem', color: 'black' }}
                onClick={() => signIn('solid', { callbackUrl: '/home' })}
              >
                <FormattedMessage id="4G0feJ" defaultMessage="Log in" description="Index page log in button." />
              </Button>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="p">
                <Link href="http://w3schools.com">
                  <FormattedMessage
                    id="nGfQl/"
                    defaultMessage="How do I login with BankID?"
                    description="Index page login help text."
                  />
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </main>
      </Grid>
    </Grid>
  );
}

export default Index;
