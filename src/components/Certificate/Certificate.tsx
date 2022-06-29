import React from 'react';
import { Grid } from '@mui/material';
import styles from './Certificate.module.css';

type Props = {
  certificate: Record<string, string>,
};

function Certificate(props: Props) {
  const { certificate } = props;

  const renderedLines = Object.keys(certificate).map((key) => (
    <div key={key}>
      <Grid container>
        <Grid item xs={12} className={styles.line}>
          {key}
          &nbsp;
          <div className={styles.lineValue}>{certificate[key]}</div>
        </Grid>
      </Grid>
    </div>
  ));

  return (
    <Grid container className={styles.stickyScroll}>
      <div className={styles.title}>Unemployment certificate</div>
      {renderedLines}
    </Grid>
  );
}

export default Certificate;
