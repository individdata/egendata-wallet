import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../requestBluebtnCard/index.module.css';

function LandingTextBox() {
  return (
    <div className={styles.box}>

      <Grid
        item
        sx={{
          display: 'flex', justifyContent: 'center', textAlign: 'center', color: 'white',
        }}
      >
        To handle your request you need to identify yourself.
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex', justifyContent: 'center', textAlign: 'center', color: '#808080', marginBottom: '20px',
        }}
      >
        If you are a first time user of Project OAK an account will be created for you
        when you log in.
      </Grid>
      <Grid
        item
        sx={{
          display: 'flex', justifyContent: 'center', textAlign: 'center', color: '#808080', marginBottom: '40px',
        }}
      >
        Project OAK terms & conditions
      </Grid>

    </div>
  );
}

export default LandingTextBox;
