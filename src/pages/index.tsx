import React from 'react';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';
import { Grid } from '@mui/material';
import { useRouter } from "next/router";
import styles from './index.module.css'
import OakLogo from '../components/OakLogo/OakLogo';
import Button from '../components/ui/Button';

import { signIn } from 'next-auth/react';

const Index = () => {
  const router = useRouter();

  const { request } = router.query;
  if (request) {
    // TOOD: Do this redirect with a middleware instead?
    router.push(`/landing?request=${request}`);
  }

  return (
    <Grid container className={styles.container}>
      <Grid item xs={12} md={6} className={styles.left}>
        <article>
          <Image className={styles.logo} alt="left-logo" src="/images/oak-green.png" width="54" height="80" />
          <h1 className={styles.title}>
            <FormattedMessage id="indexpage_title" />
          </h1>
          <h3 className={styles.subtitle}>
            <FormattedMessage id="indexpage_description" />
          </h3>
        </article>
      </Grid>
      <Grid item xs={12} md={6} className={styles.right}>
        <header>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, paddingTop: 16 }}>
            <OakLogo />
          </div>
        </header>
        <main>
          <h3 className={styles.loginTitle}>
            <FormattedMessage id="indexpage_login_text" />
          </h3>
          <Button
            preset="medium"
            type="primary"
            onPress={() => signIn('solid')}
          >
            <FormattedMessage id="indexpage_login_button" />
          </Button>
          <div className={styles.line}>
            <a href="http://w3schools.com" className={styles.link}>
              <FormattedMessage id="indexpage_about" />
            </a>
          </div>
        </main>
      </Grid>
    </Grid>
  )
};

export default Index
