import React from 'react';
import Grid from '@mui/material/Grid';
import LoginImageText from '../loginImageText/index';
import LoginImageLogo from '../loginImageLogo';

function LoginImage() {
  return (
    <Grid container spacing={3} sx={{ padding: '158px' }}>
      <LoginImageLogo />
      <LoginImageText />
    </Grid>

  );
}

export default LoginImage;
