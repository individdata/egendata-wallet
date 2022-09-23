import React from 'react';
import { signIn } from 'next-auth/react';
import { FormattedMessage } from 'react-intl';
import { Container, Grid } from '@mui/material';
import styles from './index.module.css'
import OakLogo from '../components/OakLogo/OakLogo';
import Stepper from '../components/Stepper';
import Button from '../components/ui/Button';
import { useRouter } from "next/router";

const Landing = () => {
  const router = useRouter();
  const { request } = router.query;

  return (
    <Container>
      <Grid container className={styles.container}>
        <Grid item xs={12} className={styles.right}>
          <header>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, paddingTop: 16 }}>
              <OakLogo />
            </div>
          </header>
          <main>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h2>
                  <FormattedMessage id="landingpage_title" /><strong>BNP Paribas</strong></h2>
              </Grid>
              <Grid item xs={12}>
                <Stepper requestId={request as string} />
              </Grid>
              <Grid item xs={12}>
                <h2>
                  <FormattedMessage id="landingpage_instruction" />
                </h2>
                <h3 style={{ color: 'grey' }}>
                  <FormattedMessage id="landingpage_note" />
                </h3>
              </Grid>
              <Grid item xs={12}>
                <a href="http://w3schools.com">
                  <FormattedMessage id="landingpage_about" />
                </a>
              </Grid>
              <Grid item xs={12}>
                <Button preset='medium' type="primary" onPress={() => signIn('solid', {callbackUrl: '/home'})}>
                  <FormattedMessage id="landingpage_signin" />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <h3>
                <FormattedMessage id="landingpage_footer" />
                </h3>
              </Grid>
            </Grid>
          </main>
        </Grid>
      </Grid>
    </Container>
  )
};

export default Landing;
