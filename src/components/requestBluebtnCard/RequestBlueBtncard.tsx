import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';
import GetDataBall from '../getDataBall/GetDataBall';
import GreenArrowLogo from '../greenArrowLogo/GreenArrowLogo';
import ShareBall from '../shareBall/ShareBall';

function BlueBtnCard() {
  return (
    <div className={styles.box}>
      <Grid
        container
        sx={{
          marginTop: '20px',
          marginBottom: '40px',
          borderRadius: '12px',
          backgroundColor: '#2d43a5',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '150px',
        }}
      >
        <Grid className={styles.center} xs={12} md={4}>
          <GetDataBall />
        </Grid>
        <Grid className={styles.center} xs={12} md={4}>
          <GreenArrowLogo />
        </Grid>
        <Grid className={styles.center} xs={12} md={4}>
          <ShareBall />
        </Grid>
      </Grid>
    </div>
  );
}

export default BlueBtnCard;
