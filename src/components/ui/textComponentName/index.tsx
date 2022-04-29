import React from 'react';

import { Grid } from '@mui/material';

export interface RequestType {
  brief: string,
  name: string,
}

function TextComponentName(props: RequestType) {
  const { name } = props;
  return (
    <Grid container spacing={3}>
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
          fontSize: '18px',
          fontWeight: '600',
        }}
      >
        {name}
      </Grid>
    </Grid>
  );
}

export default TextComponentName;
