import React from 'react';
import Grid from '@mui/material/Grid';

const style2 = {
  container: {
    display: 'flex',
    color: 'white',
    fontSize: '16px',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  } as any,
};

function AfSourcetitle() {
  return (
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
      <h2 style={style2.container}>Get from:</h2>
    </Grid>
  );
}

export default AfSourcetitle;
