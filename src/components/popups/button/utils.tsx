import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../index.module.css';
import { ButtonProps } from '../types';

export function ButtonGreen(props: ButtonProps) {
  const { onPress, label } = props;
  return (
    <Grid xs={12}>
      <button
        className={styles.button}
        type="button"
        onClick={() => onPress()}
      >
        <Grid className={styles.buttontext}>{ label }</Grid>
      </button>
    </Grid>
  );
}

export function ButtonDisable(props: ButtonProps) {
  const { label } = props;
  return (
    <Grid xs={12}>
      <button
        className={styles.button}
        type="button"
        disabled
      >
        <Grid className={styles.buttontext}>{ label }</Grid>
      </button>
    </Grid>
  );
}

export default ButtonGreen;
