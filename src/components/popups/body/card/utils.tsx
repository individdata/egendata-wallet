import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../../popupcard.module.css';
import { TitleTypes, ItemsTypes } from '../../types';
import { style4 } from '../../styles';

export function Title(props: TitleTypes) {
  const { title } = props;
  return (

    <Grid container sx={style4.centerRow}>
      <Grid xs={6} className={styles.smallText} sx={style4.colorBottom}>
        {title}
      </Grid>
      <Grid xs={6} className={styles.smallText} />
    </Grid>

  );
}
export function Items(props:ItemsTypes) {
  const { name, status } = props;
  return (

    <Grid container className={styles.centerMe} sx={style4.centerRow}>
      <Grid xs={6} className={styles.smallText}>
        {name}
      </Grid>
      <Grid xs={6} className={styles.smallText} sx={style4.colorBottom}>
        {status}
      </Grid>
    </Grid>

  );
}
