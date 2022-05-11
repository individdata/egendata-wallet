/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import FetchComplete from './pages/FetchComplete';
import FetchDetailPreview from './pages/FetchDetailPreview';
import FetchInProgress from './pages/FetchInProgress';
import FetchLegalPreview from './pages/FetchLegalPreview';
import ShareComplete from './pages/ShareComplete';
import ShareDetailPreview from './pages/ShareDetailPreview';
import ShareInProgress from './pages/ShareInProgress';
import ShareLegalPreview from './pages/ShareLegalPreview';
import styles from './Popup.module.css';

function Popup() {
  const popupData = useSelector((state: RootState) => state.popup.popupData);
  if (!popupData) return <div />;

  const { component, props } = popupData;

  return (
    <div className={styles.container}>
      <Grid container className={styles.popupContainer}>
        <Grid item xs={12} sm={10} md={8} lg={6} xl={4} className={styles.frame}>
          {component === 'FetchDetailPreview' && <FetchDetailPreview {...props} />}
          {component === 'FetchLegalPreview' && <FetchLegalPreview {...props} />}
          {component === 'FetchInProgress' && <FetchInProgress {...props} />}
          {component === 'FetchComplete' && <FetchComplete {...props} />}
          {component === 'ShareDetailPreview' && <ShareDetailPreview {...props} />}
          {component === 'ShareLegalPreview' && <ShareLegalPreview {...props} />}
          {component === 'ShareInProgress' && <ShareInProgress {...props} />}
          {component === 'ShareComplete' && <ShareComplete {...props} />}
        </Grid>
      </Grid>
    </div>
  );
}

export default Popup;
