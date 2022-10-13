import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { signIn, useSession } from 'next-auth/react';
import MenuBar from '../../components/MenuBar/MenuBar';
import Stepper from '../../components/Stepper';
import Link from '../../lib/Link';
import theme from '../../theme';

type RequestState = {
  id: string;
  location: string;
  state: 'received' | 'fetching' | 'available' | 'sharing';
};

const decodeAndStorePayload = async (payload: string): Promise<RequestState> => {
  if (!payload) throw Error('Missing payload.');

  const incomingRequest = JSON.parse(Buffer.from(decodeURIComponent(payload), 'base64').toString('utf8'));
  const result = await fetch('/api/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(incomingRequest),
  });

  if (result.status !== 200) throw Error('Failed to save request.');

  localStorage.clear();
  return result.json();
};

function Landing() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && !router.query.payload) {
      const payload = localStorage.get('payload');
      decodeAndStorePayload(payload).then((data) => router.push(`/request/${data.id}?redirect`));
    }
  }, [router]);

  const handleContinue = async () => {
    const payload = Array.isArray(router.query.payload) ? router.query.payload[0] : router.query.payload;
    if (!payload) throw Error('Missing payload.');

    if (session) {
      const data = await decodeAndStorePayload(payload);
      router.push(`/request/${data.id}?redirect`);
    } else {
      localStorage.setItem('payload', payload);
      signIn('solid', { callbackUrl: '/request' });
    }
  };

  return (
    <Container maxWidth="lg">
      <MenuBar disabledNav />

      <main>
        <Grid container alignItems="center" flexDirection="column" minHeight="90vh">
          <Grid item textAlign="center" xs={12}>
            <Typography component="h1" variant="h1" color="text.secondary" marginBottom={-4}>
              <FormattedMessage
                id="JvjNu7"
                defaultMessage="Share your data with <boldThis>{party}</boldThis>"
                description="Landing page main title."
                values={{
                  party: 'BNP Paribas',
                  boldThis: (msg) => (
                    <Typography component="span" variant="h1" color="text.primary">
                      {msg}
                    </Typography>
                  ),
                }}
              />
            </Typography>
          </Grid>
          <Grid item xs={12} md={10} lg={6} textAlign="center" paddingTop={8}>
            <Stepper requestId="" landing />
            <Typography component="h2" variant="body1" fontSize="1rem" fontWeight="600">
              <FormattedMessage
                defaultMessage="To handle your request you need to identify yourself."
                id="5fkC00"
                description="Landing page instruction."
              />
            </Typography>
            <Typography fontSize="1rem" color="text.secondary">
              <FormattedMessage
                defaultMessage="If you are a first time user of Project OAK an account will be created for you when you log in."
                id="gWb9Tk"
                description="Landing page further instruction."
              />
            </Typography>

            <Typography fontSize="1rem" color="text.secondary" marginTop={4}>
              <FormattedMessage
                id="QEzAbb"
                defaultMessage="By registering you accept our{linebreak}<linkPrivacyPolicy>Privacy Policy</linkPrivacyPolicy> and <linkTermsOfService>Terms of service</linkTermsOfService>."
                description="Landing page terms and conditions text."
                values={{
                  linebreak: <br />,
                  linkPrivacyPolicy: (text) => (
                    <Link href="/privacypolicy" color="text.primary">
                      {text}
                    </Link>
                  ),
                  linkTermsOfService: (text) => (
                    <Link href="/termsofservice" color="text.primary">
                      {text}
                    </Link>
                  ),
                }}
              />
            </Typography>
            <Box marginTop={4}>
              <Button
                size="large"
                variant="contained"
                onClick={handleContinue}
                fullWidth
                sx={{ fontSize: '1.25rem', maxWidth: '60%', color: 'black' }}
              >
                <FormattedMessage id="xxJ8Ck" defaultMessage="Continue" description="Landing page continue button." />
              </Button>
            </Box>
          </Grid>
          <Grid item flexGrow={1} />
          <Grid item xs={12} md={10} lg={6} textAlign="center" color="text.secondary">
            <Typography component="h3" variant="body1" fontSize="1rem">
              <FormattedMessage
                id="npMjyJ"
                defaultMessage="Project Oak is a governmental initiative that allows you to store and transfer digital information between public and private organtisations."
                description="Landing page footer disclaimer."
              />
            </Typography>
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export default Landing;
