import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../../pages/redirect/index.module.css';
import AfTitleText from './AfTitleText';
import FileLogoComponent from './FileLogoComponent';
import TextFileComponent from './TextFileComponent';
import AfSourcetitle from './AfSourcetitle';
import GetDataButton from './GetDataButton';

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

function ShareEmployementCard() {
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
          width: '50%',
          paddingTop: '10px',
          marginTop: '35px',
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            backgroundColor: 'transparent',
          }}
        >
          <Grid item md={6} xs={12} className={styles.smallDevice}>
            <Grid container spacing={3} sx={style2.columnCenter}>
              <FileLogoComponent />
              <TextFileComponent />
            </Grid>
          </Grid>
          <Grid item md={6} xs={12} className={styles.smallDevice}>
            <Grid container spacing={3} sx={style2.columnCenter}>
              {/* takes up half of the screen row 1 col 2 */}
            </Grid>
          </Grid>

          <Grid item md={6} xs={12} className={styles.smallDevice}>
            <Grid container spacing={3} sx={style2.columnCenter}>
              <AfSourcetitle />
              <AfTitleText />
            </Grid>
          </Grid>
          <Grid item md={6} xs={12} className={styles.smallDevice}>
            <GetDataButton />
          </Grid>
        </Grid>
      </button>
    </Grid>
  );
}

export default ShareEmployementCard;
