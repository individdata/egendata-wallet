import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import styles from './index.module.css';

type Props = {
  certificate: Record<string, string>,
};

function Certificate(props: Props) {
  const { certificate } = props;

  const renderedLines = Object.keys(certificate).map((key) => (
    <Typography variant="h6" component="p">
      {key}
      &nbsp;
      <div className={styles.lineValue}>{certificate[key]}</div>
    </Typography>
  ));

  return (
    <Grid container className={styles.stickyScroll}>
      <Typography variant="h4" component="h2" sx={{ color: '#65D36E' }}>
        Unemployment certificate
      </Typography>
      <Stack direction="column">
        {renderedLines}
      </Stack>
    </Grid>
  );
}

export default Certificate;
