import React from 'react';
import Grid from '@mui/material/Grid';
import { TitleTypes } from '../types';
import styles from '../popupcard.module.css';
import { style4 } from '../styles';

export function Title(props: TitleTypes) {
  const { title } = props;
  return (
    <Grid
      className={styles.center}
      sx={style4.pad10}
    >
      <Grid md={12} className={styles.textHeader}>
        {title}
      </Grid>
    </Grid>
  );
}

export function SubTitle(props: TitleTypes) {
  const { title } = props;
  return (
    <Grid
      className={styles.center}
      sx={style4.pad20}
    >
      <Grid md={12} className={styles.pText}>
        {title}
      </Grid>
    </Grid>
  );
}
