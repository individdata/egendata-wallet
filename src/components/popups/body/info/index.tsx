import React from 'react';
import Grid from '@mui/material/Grid';
import { style4 } from '../../styles';
import styles from '../../popupcard.module.css';
import { BodyTypes } from '../../types';

function info(props: BodyTypes) {
  const { msg } = props;
  return (
    <Grid container className={styles.scroll}>
      <Grid xs={12} sx={style4.pad20}>
        {msg}
      </Grid>
    </Grid>

  );
}

export default info;
