import React from 'react';
import Grid from '@mui/material/Grid';
import { style4 } from '../../styles';
import styles from '../../popupcard.module.css';
import { PropTypes } from '../../types';

function info(props: PropTypes) {
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
