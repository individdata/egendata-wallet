import React from 'react';
import Grid from '@mui/material/Grid';
import { AiOutlineClose } from 'react-icons/ai';
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

export function ExitRow(props: ButtonProps) {
  const { onPress, label } = props;
  return (
    <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
      <Grid item xs={2} />
      <Grid item xs={2} />
      <Grid item xs={2} />
      <Grid item xs={2} />
      <Grid item xs={2} />
      <Grid item xs={2} md={2} style={{ paddingTop: '20px' }}>
        <button
          type="button"
          className={styles.button2}
          onClick={() => onPress()}
        >
          {label}
          <AiOutlineClose id={styles.exit} />
        </button>
      </Grid>
    </Grid>
  );
}

export function MissingUnEmployementButton() {
  return (
    <Grid item xs={12} sx={{ marginBottom: '25px' }}>
      <button style={style5.button} type="button">
        <Grid sx={style5.buttonText}>
          Go to Arbetsförmedlingens website
          <i
            className="fa-solid fa-arrow-up-right-from-square"
            style={{ marginLeft: '15px' }}
          />
        </Grid>
      </button>
    </Grid>
  );
}

export default ButtonGreen;
