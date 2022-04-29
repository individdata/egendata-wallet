import React from 'react';
import { Grid } from '@mui/material';

export interface RequestType {
  date: string;
}
function TextComponentDate(props: RequestType) {
  const { date } = props;
  return (

    <Grid
      container
      spacing={3}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          fontFamily: 'Open Sans',
          color: '#fff',
          fontStyle: 'normal',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        {date}

      </Grid>

    </Grid>
  );
}

export default TextComponentDate;
