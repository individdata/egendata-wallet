import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './popupcard.module.css';

const style2 = {
  pad10: {
    padding: '10px', justifyContent: 'center',
  },
  pad20: {
    padding: '20px', justifyContent: 'center',
  },

  centerRow: {
    display: 'flex', flexDirection: 'row', justifyContent: 'center',
  },
  colorBottom: {

    color: '#65D36E',
    marginBottom: '20px',

  },
  minColor: {
    color: '#65D36E',
    minWidth: '110px',

  },

};

export interface PropTypes {
  msg: string

}

function ReviewPopupCard(props: PropTypes) {
  const { msg } = props;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid
          className={styles.center}
          sx={style2.pad10}
        >
          <Grid md={12} className={styles.textHeader}>
            Review your document data
          </Grid>
        </Grid>

        <Grid
          className={styles.center}
          sx={style2.pad20}

        >
          <Grid md={12} className={styles.pText}>
            You are about to share your Unemployment certificate to BNP Paribas.
          </Grid>
        </Grid>

        <Grid className={styles.pText}>
          <Grid className={styles.stickyScroll}>
            <Grid container sx={style2.centerRow}>
              <Grid
                xs={6}
                className={styles.smallText}
                sx={style2.colorBottom}
              >
                Unmployment certificate
              </Grid>
              <Grid
                xs={6}
                className={styles.smallText}
              />
            </Grid>

            <Grid container className={styles.centerMe} sx={style2.centerRow}>
              <Grid xs={6} className={styles.smallText}>
                Employment status:
              </Grid>
              <Grid
                xs={6}
                className={styles.smallText}
                sx={style2.colorBottom}
              >
                XXXX
              </Grid>
            </Grid>

            <Grid container className={styles.centerMe} sx={style2.centerRow}>
              <Grid xs={6} className={styles.smallText}>
                Employment status start date:
              </Grid>
              <Grid
                xs={6}
                className={styles.smallText}
                sx={
                  style2.minColor
                }
              >
                XXXX
              </Grid>
            </Grid>

            <Grid
              container
              className={styles.centerMe2}
              sx={style2.centerRow}
            >
              <Grid xs={6} className={styles.smallText}>
                Employment certificate request date:
              </Grid>
              <Grid
                xs={6}
                className={styles.smallText}
                sx={style2.minColor}
              >
                XXXX
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={styles.scroll}>
            <Grid xs={12} sx={style2.pad20}>
              {msg}
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={12}>
              <button className={styles.button} type="button">
                <Grid className={styles.buttontext}>Next</Grid>
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
}

export default ReviewPopupCard;
