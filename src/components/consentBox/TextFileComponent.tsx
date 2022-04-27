import React from 'react';
import Grid from '@mui/material/Grid';

function TextFileComponent() {
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Open Sans',
        color: '#fff',
        fontStyle: 'normal',
        fontSize: '18px',
        fontWeight: '600',
      }}
    >
      Unemployemend certificate
    </Grid>
  );
}

export default TextFileComponent;
