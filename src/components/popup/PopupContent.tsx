import { Grid } from '@mui/material';
import React, { ReactNode } from 'react';
import styles from './PopupContent.module.css';

type Props = {
  children: ReactNode | ReactNode[],
};

function PopupContent(props: Props) {
  const { children } = props;

  return (
    <Grid container className={styles.container}>
      <Grid item xs={12} className={styles.item}>
        {children}
      </Grid>
    </Grid>
  );
}

export default PopupContent;
