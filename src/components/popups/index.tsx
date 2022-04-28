/* eslint-disable max-len */
import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';
import { style2, style3 } from './styles';
import Header from './header';
import Body from './body';
import Button from './button';

function Popups() {
  return (
    <div className={styles.main}>
      <Grid container spacing={3} className={style2.whiteBox} sx={style2.h} />
      <Grid container spacing={3} sx={style2.whiteBox}>
        <Grid item md={3} />
        <Grid md={5} xs={8} sx={style3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Header />
              <Grid className={style2.whiteBox}>
                <Body msg="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Utenim ad minim veniam, quis nostrud exercitation ullamco laborisnisi ut aliquip ex ea commodo consequat." />
              </Grid>
              <Button />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={3} />
      </Grid>
    </div>
  );
}

export default Popups;
