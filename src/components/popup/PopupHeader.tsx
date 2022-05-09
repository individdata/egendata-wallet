import React from 'react';
import { Grid } from '@mui/material';
import styles from './PopupHeader.module.css';
import popupStyles from './Popup.module.css';

type Props = {
  title: string,
  subtitle: string,
};

function PopupHeader(props: Props) {
  const { title, subtitle } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className={styles.title}>{title}</div>
      </Grid>
      <Grid item xs={12}>
        <div className={styles.subtitle}>{subtitle}</div>
      </Grid>
      <Grid item xs={12}>
        <div className={popupStyles.divider} />
      </Grid>
    </Grid>
  );
}

export default PopupHeader;
