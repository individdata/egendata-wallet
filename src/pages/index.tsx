import React from 'react';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Link from '../lib/Link';

function Index() {
  const router = useRouter();

  return (
    <Grid container component="main">
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          height: '100vh',
          backgroundImage: 'url(/leaves.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        container
        direction="column"
        justifyContent="center"
      >
        <Grid item textAlign="center">
          <Typography variant="h1" component="h1">
            <FormattedMessage
              id="aeoy6U"
              defaultMessage="Your data in your control"
              description="Index page main text."
            />
          </Typography>
          <Typography variant="h3" component="h2">
            <FormattedMessage
              id="6RE9ba"
              defaultMessage="Project Oak is a governmental initiative that allows you to store and transfer digital information between public and private organizations."
              description="Index page main subtitle."
            />
          </Typography>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          height: '100vh',
        }}
        container
        direction="column"
        justifyContent="space-between"
      >
        <Grid item container direction="row" gap={1} padding={8}>
          <Image src="/images/oak-green.png" width="27px" height="40px" />
          <Typography fontSize={30}>Egendata</Typography>
        </Grid>

        <Grid item>
          <Grid container flexDirection="column" textAlign="center">
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
        </Grid>
        <Grid item flexBasis={40} />
      </Grid>
    </Grid>
  );
}

export default Index;
