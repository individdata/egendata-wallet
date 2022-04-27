import Grid from '@mui/material/Grid';
import React from 'react';

const style2 = {
  container: {
    display: 'flex',
    color: '#65D36E',
    fontSize: '16px',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  } as any,

  flexer: {
    display: 'flex', justifyContent: 'center',
  },
};

function AfTitleText() {
  return (
    <Grid item xs={12} sx={style2.flexer}>
      <h2 style={style2.container}>Arbetsförmedligen</h2>
    </Grid>
  );
}

export default AfTitleText;
