import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../../popupcard.module.css';
import { TitleTypes, ItemsTypes } from '../../types';

const style2 = {
  pad10: {
    padding: '10px',
    justifyContent: 'center',
  },
  pad20: {
    padding: '20px',
    justifyContent: 'center',
  },

  centerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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

export function Title(props: TitleTypes) {
  const { title } = props;
  return (

    <Grid container sx={style2.centerRow}>
      <Grid xs={6} className={styles.smallText} sx={style2.colorBottom}>
        {title}
      </Grid>
      <Grid xs={6} className={styles.smallText} />
    </Grid>

  );
}
export function Items(props:ItemsTypes) {
  const { name, status } = props;
  return (

    <Grid container className={styles.centerMe} sx={style2.centerRow}>
      <Grid xs={6} className={styles.smallText}>
        {name}
      </Grid>
      <Grid xs={6} className={styles.smallText} sx={style2.colorBottom}>
        {status}
      </Grid>
    </Grid>

  );
}
