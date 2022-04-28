import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../popupcard.module.css';

const style2 = {
  pad10: {
    padding: '10px', justifyContent: 'center',
  },
  pad20: {
    padding: '20px', justifyContent: 'center',
  },

  centerRow: {
    display: 'flex', flexDirection: 'row', justifyContent: 'center',
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
function Header() {
  return (
    <>

      <Grid
        className={styles.center}
        sx={style2.pad10}
      >
        <Grid md={12} className={styles.textHeader}>
          Review your document data
        </Grid>
      </Grid>
      <Grid
        className={styles.center}
        sx={style2.pad20}
      >
        <Grid md={12} className={styles.pText}>
          You are about to share your Unemployment certificate to BNP Paribas.
        </Grid>
      </Grid>
    </>
  );
}

export default Header;
