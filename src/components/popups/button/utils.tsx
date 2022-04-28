import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';
import { ButtonProps } from '../types';

export function ButtonGreen(props: ButtonProps) {
  const { onPress, label } = props;
  return (
    <Grid xs={12}>
      <button
        className={styles.buttongreen}
        type="button"
        onClick={() => onPress()}
      >
        <Grid className={styles.buttontextgreen}>{ label }</Grid>
      </button>
    </Grid>
  );
}

export function ButtonDisable(props: ButtonProps) {
  const { label } = props;
  return (
    <Grid xs={12}>
      <button
        className={styles.buttondisable}
        type="button"
        disabled
      >
        <Grid className={styles.buttontextdisable}>{ label }</Grid>
      </button>
    </Grid>
  );
}

export default ButtonGreen;
