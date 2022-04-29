import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';
import { ButtonProps } from '../types';
import { style5 } from '../styles';

export function ButtonGreen(props: ButtonProps) {
  const { onPress, label } = props;
  return (
    <Grid xs={12}>
      <button
        className={styles.buttongreen}
        type="button"
        onClick={() => onPress()}
      >
        <Grid className={styles.buttontextgreen}>{label}</Grid>
      </button>
    </Grid>
  );
}

export function ButtonDisable(props: ButtonProps) {
  const { label } = props;
  return (
    <Grid xs={12}>
      <button className={styles.buttondisable} type="button" disabled>
        <Grid className={styles.buttontextdisable}>{label}</Grid>
      </button>
    </Grid>
  );
}

export function GeneralButton(props: ButtonProps) {
  const { label, onPress } = props;
  return (
    <Grid item xs={12} md={6} sx={style5.marginTop}>
      <button type="button" style={style5.active} onClick={() => onPress()}>
        <div style={style5.fonts}>{label}</div>
      </button>
    </Grid>
  );
}

export function GeneralInactiveButton(props: ButtonProps) {
  const { label, onPress } = props;
  return (
    <Grid item xs={12} md={6} sx={style5.marginTop}>
      <button type="button" style={style5.inActive} onClick={() => onPress()}>
        <div style={style5.fonts}>{label}</div>
      </button>
    </Grid>
  );
}

export function GeneralHideButton(props: ButtonProps) {
  const { label } = props;
  return (
    <Grid item xs={12} md={6} sx={style5.marginTop}>
      <button type="button" style={style5.hide}>
        <div style={style5.fonts}>{label}</div>
      </button>
    </Grid>
  );
}

export default ButtonGreen;
