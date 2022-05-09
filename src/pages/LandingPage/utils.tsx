import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';

export function Footer() {
  return (
    <div className={styles.text5}>
      Project Oak is a governmental initiative that allows you to store and
      transfer digital information between public and private organtisations.
    </div>
  );
}

export function Title() {
  return (
    <div className={styles.word1} id="bnpTitle">
      Share your data with
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
            To handle your request you need to identify yourself.
          </div>
          <div className={styles.line2}>
            If you are a first time user of Project OAK an account will be created for you when you log in.
          </div>
          <div className={styles.line3}>
            <a href="http://w3schools.com"> Project OAK terms & conditions</a>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
