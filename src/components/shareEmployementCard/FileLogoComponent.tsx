import Grid from '@mui/material/Grid';
import { AiOutlineFileText } from 'react-icons/ai';
import React from 'react';

function FileLogoComponent() {
  return (
    <Grid
      item
      xs={12}
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <AiOutlineFileText
        style={{
          margin: 'auto',
          color: '#65d36e',
          fontSize: '20px',
        }}
        size={40}
      />
    </Grid>
  );
}

export default FileLogoComponent;
