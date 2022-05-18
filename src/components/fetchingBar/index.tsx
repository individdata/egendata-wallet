import { Grid } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.css';

type Props = {
  id: string,
};

function FetchingBar(props: Props) {
  const { id } = props;

  return (
    <Grid>
      <div className={styles.fetchColumn}>
        <div className={styles.fecthText}>
          <FormattedMessage id={id} />
        </div>
        <div className={styles.ldsring}><div>&nbsp;</div></div>
      </div>
    </Grid>
  );
}

export default FetchingBar;
