import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './ConsentDocTransferCard.module.css';
import { Checkbox, CheckBoxText } from './body/card/utils';

export interface RequestType {
  msg: string;
  title: string;
  p1: string;
}

const style2 = {
  p1: {
    justifyContent: 'center',
    display: 'flex',
    fontSize: '22px',
    fontWeight: '600',
    padding: '10px',
    marginTop: '20px',
  },

  p2: {
    justifyContent: 'center',
    display: 'flex',
    fontSize: '18px',
    fontWeight: '400',
  },
  scroll: {
    maxHeight: '140px',
    overflowY: 'scroll',
  },
  marginTop: {
    marginTop: '50px',
    marginBottom: '20px',
  },

};

function ConsentDocTransferCard(props:RequestType) {
  const { msg, title, p1 } = props;
  return (

    <Grid container spacing={3}>
      <Grid item xs={12} sx={style2.p1}>
        {title}
      </Grid>
      <Grid item xs={12} sx={style2.p2}>
        {p1}
      </Grid>

      <Grid item xs={12}>
        <Grid className={styles.scroll}>
          <Grid sx={style2.p2}>{msg}</Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={10}>
        <Grid container>
          <Checkbox />
          <CheckBoxText msg="I agree that this process removes the confidentiality of the information I choose to share with BNP Paribas." />
        </Grid>

        <Grid container>
          <Checkbox />
          <CheckBoxText msg="I agree that this process removes the confidentiality of the information I choose to share with BNP Paribas." />
        </Grid>
        <Grid container>
          <Checkbox />
          <CheckBoxText msg="I have reviewed the information and confirm that no unwanted information is included in the transfer to Dummy." />
        </Grid>
        <Grid container>
          <Checkbox />
          <CheckBoxText msg="I have read and understand how Project OAK processes my personal data." />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={style2.marginTop}>
        <button
          type="button"
          className={styles.button}
        >
          <div style={{ fontSize: '16px', fontWeight: '600' }}>Consent and get data</div>
        </button>

      </Grid>

    </Grid>
  );
}

export default ConsentDocTransferCard;
