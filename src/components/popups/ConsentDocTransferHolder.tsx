/* eslint-disable max-len */
import React from 'react';

import Grid from '@mui/material/Grid';
import styles from './ConsentDocTransferHolder.module.css';
import ConsentDocTransferCard from './ConsentDocTransferCard';

const style2 = {
  whiteBox: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  } as any,
  h: {
    height: '30%',
  },
};

function ConsentDocTransferHolder() {
  return (
    <div
      className={
    true
      ? styles.main1
      : styles.main2
  }
    >
      <Grid container spacing={3} className={style2.whiteBox} sx={style2.h} />
      <Grid container spacing={3} sx={style2.whiteBox}>
        <Grid item md={3} />
        <Grid
          md={5}
          xs={8}
          sx={{ backgroundColor: 'blueviolet', borderRadius: '15px' }}
        >
          <ConsentDocTransferCard
            title="Consent document transfer"
            msg="BNP Paribas will be provided information that you are registered as a job seeker in Arbetsförmedlingen and the date of such registration. For privacy reasons, BNP Paribas will not have access to any other information about you. You can withdraw your consent at any time which will terminate any further data transfer. When you are no longer registered as a job seeker in Arbetsförmedlingen, the transfer automatically terminates and you will need to provide an additional consent for the 'job-seeker status' final date to be transfered to BNP Paribas."
            p1="You are about to fetch your Unemployment certificate from Arbetsförmedlingen."
          />
        </Grid>
        <Grid item md={3} />
      </Grid>
    </div>
  );
}

export default ConsentDocTransferHolder;
