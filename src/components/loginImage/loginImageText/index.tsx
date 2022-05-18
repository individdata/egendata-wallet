import React from 'react';
import { FormattedMessage } from 'react-intl';
import Grid from '@mui/material/Grid';
import styles from './index.module.css';

function LoginImageText() {
  return (
    <Grid container>
      <Grid className={styles.header} item xs={12}>
        <Grid sx={{ maxWidth: '340px' }}>
          <p className={styles.first}>
            <FormattedMessage id="image_page_title" />
          </p>
        </Grid>
      </Grid>
      <Grid item xs={12} className={styles.textContainer}>
        <p>
          <FormattedMessage id="image_page_description" />
        </p>
      </Grid>
    </Grid>
  );
}

export default LoginImageText;
