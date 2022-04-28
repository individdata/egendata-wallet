import React from 'react';
import Grid from '@mui/material/Grid';

export interface PropsType{
  msg:string
}

function CheckBoxtext(props:PropsType) {
  const { msg } = props;
  return (
    <Grid container xs={12} md={10}>
      <Grid item xs={12} md={12} sx={{ fontSize: '13px', fontWeight: '600' }}>
        {msg}
      </Grid>
    </Grid>

  );
}

export default CheckBoxtext;
