import React from 'react';
import Grid from '@mui/material/Grid';
import { PropTypes } from '../../types';

const style2 = {
  pad10: {
    padding: '10px',
    justifyContent: 'center',
  },
  pad20: {
    padding: '20px',
    justifyContent: 'center',
  },

  centerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colorBottom: {
    color: '#65D36E',
    marginBottom: '20px',
  },
  minColor: {
    color: '#65D36E',
    minWidth: '110px',
  },
};

function info(props: PropTypes) {
  const { msg } = props;
  return (
    <Grid xs={12} sx={style2.pad20}>
      {msg}
    </Grid>
  );
}

export default info;
