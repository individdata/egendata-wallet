import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';
import GetDataBall from './getDataBall/GetDataBall';
import GreenArrowLogo from '../ui/greenArrowLogo/GreenArrowLogo';
import ShareBall from './shareBall/ShareBall';

const style2 = {
  columnCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  miniBox: {
    width: '40%',
    padding: '10px',
    minWidth: '315px',
  },
};

function BlueBtnCard() {
  return (

    <Grid
      item
      xs={12}
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <button
        type="button"
        className={styles.requestBoxItem1}
        style={{
          width: '100%',
          paddingTop: '10px',
          marginTop: '35px',
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            backgroundColor: '#2d43a5',
            borderRadius: '15px',
          }}
        >
          <Grid item md={4} xs={12} className={styles.smallDevice}>
            <Grid container spacing={3} sx={style2.columnCenter}>
              <GetDataBall />
            </Grid>
          </Grid>
          <Grid item md={4} xs={12} className={styles.smallDevice}>
            <Grid container spacing={3} sx={style2.columnCenter}>
              <GreenArrowLogo />
            </Grid>
          </Grid>

          <Grid item md={4} xs={12} className={styles.smallDevice}>
            <Grid container spacing={3} sx={style2.columnCenter}>
              <ShareBall />
            </Grid>
          </Grid>
        </Grid>
      </button>
    </Grid>
  );
}

export default BlueBtnCard;
