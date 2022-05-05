import { AiOutlineExclamationCircle } from 'react-icons/ai';
import React from 'react';
import Grid from '@mui/material/Grid';
import { TitleTypes } from '../types';
import styles from './index.module.css';
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

export function MissingUnEmployementHeader() {
  return (
    <Grid item xs={12}>
      <Grid style={{ marginTop: '15%' }} sx={style4.center}>
        <Grid style={style4.danger}>
          <AiOutlineExclamationCircle />
        </Grid>
      </Grid>
    </Grid>
  );
}
