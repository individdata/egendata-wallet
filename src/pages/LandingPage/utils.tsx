import React from 'react';
import { FormattedMessage } from 'react-intl';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';

export function Footer() {
  return (
    <div className={styles.text5}>
      <FormattedMessage id="landingpage_footer" />
    </div>
  );
}

export function Title() {
  return (
    <div className={styles.word1} id="bnpTitle">
      <FormattedMessage id="landingpage_title" />
      <div className={styles.word2}> BNP Paribas</div>
    </div>
  );
}

export function LandingTextBox() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={styles.box}>
          <div className={styles.line1}>
            <FormattedMessage id="landingpage_line1" />
          </div>
          <div className={styles.line2}>
            <FormattedMessage id="landingpage_line2" />
          </div>
          <div className={styles.line3}>
            <a href="http://w3schools.com">
              <FormattedMessage id="landingpage_link" />
            </a>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
