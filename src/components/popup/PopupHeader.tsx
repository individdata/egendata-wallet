import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Grid } from '@mui/material';
import styles from './PopupHeader.module.css';
import popupStyles from './Popup.module.css';

type Props = {
  titleId: string,
  subtitleId: string,
};

function PopupHeader(props: Props) {
  const { titleId, subtitleId } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h3 className={styles.title}>
          <FormattedMessage id={titleId} />
        </h3>
      </Grid>
      <Grid item xs={12}>
        <h4 className={styles.subtitle}>
          <FormattedMessage id={subtitleId} />
        </h4>
      </Grid>
      <Grid item xs={12}>
        <div className={popupStyles.divider} />
      </Grid>
    </Grid>
  );
}

export default PopupHeader;
