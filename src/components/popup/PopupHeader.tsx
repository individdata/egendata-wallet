import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid } from '@mui/material';
import styles from './PopupHeader.module.css';
import popupStyles from './Popup.module.css';

type Props = {
  title_id: string,
  subtitle_id: string,
};

function PopupHeader(props: Props) {
  const { title_id, subtitle_id } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className={styles.title}>
          <FormattedMessage id={title_id} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={styles.subtitle}>
          <FormattedMessage id={subtitle_id} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className={popupStyles.divider} />
      </Grid>
    </Grid>
  );
}

export default PopupHeader;
