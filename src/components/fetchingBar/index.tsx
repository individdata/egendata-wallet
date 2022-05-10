import { Grid } from '@mui/material';
import React from 'react';
import styles from './index.module.css';

type Props = {
  label: string,
};

function FetchingBar(props: Props) {
  const { label } = props;

  return (
    <Grid>
      <div className={styles.fetchColumn}>
        <div className={styles.fecthText}>{label}</div>
        <div className={styles.ldsring}><div>&nbsp;</div></div>
      </div>
    </Grid>
  );
}

export default FetchingBar;
