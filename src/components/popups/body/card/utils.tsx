/* eslint-disable */
import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';
import {
  TitleTypes, ItemsTypes, BodyTypes, CertificateProps,
} from '../../types';
import { style4 } from '../../styles';

export function Title(props: TitleTypes) {
  const { title } = props;
  return (
    <Grid container sx={style4.centerRow}>
      <Grid xs={6} className={styles.titlefield} sx={style4.colorBottom}>
        {title}
      </Grid>
    </Grid>
  );
}

export function Items(props: ItemsTypes) {
  const { name, status } = props;
  return (
    <div>
      <Grid container className={styles.centerMe}>
        <Grid xs={12} className={styles.field}>
          {name}
          <div className={styles.status}>
            {status}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export function Certificate(props: CertificateProps) {
  const { certificate } = props;
  const items = Object.keys(certificate).map((key) => {
    return (<Items name={key} status={certificate[key]} />);
  });
  return (
    <Grid className={styles.stickyScroll}>
      <Title title="Unmployment certificate" />
      {items}
    </Grid>
  );
}

export function CheckInfo(props: BodyTypes) {
  const { msg } = props;
  return (
    <Grid className={styles.stickyScrollHigh}>
      {msg}
    </Grid>
  );
}

export function SuccessGetDataBox(props: BodyTypes) {
  const { msg } = props;
  return (
    <Grid container className={styles.scroll}>
      <Grid xs={12} sx={style4.pad20}>
        <div className={styles.rows}>
          <div className={styles.row}>
            <img className={styles.logo} />
          </div>
          {msg}
        </div>
      </Grid>
    </Grid>
  );
}
