import { ImArrowUpRight2 } from 'react-icons/im';
import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';

const style2 = {
  columnCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  header: {
    backgroundColor: 'transparent',
    border: '2px solid #65D36E ',
    padding: '9px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10px',
  } as any,
  text: {
    color: '#65D36E',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginRight: '15px',
  } as any,
};

function GetDataButton() {
  return (
    <Grid container spacing={3} sx={style2.columnCenter}>
      <button className={styles.button} style={style2.header} type="button">
        <h2 style={style2.text}>Get Data</h2>
        <ImArrowUpRight2 id={styles.topRight} />
      </button>
    </Grid>
  );
}

export default GetDataButton;
