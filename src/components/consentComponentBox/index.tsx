import React from 'react';

import Grid from '@mui/material/Grid';
import styles from './index.module.css';

export interface RequestType {
  content: string
}

function ConsentComponentBox(props: RequestType) {
  const { content } = props;

  return (
    <Grid
      container
      spacing={3}
      sx={{
        backgroundColor: '#191B1F',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '16px',
      }}
    >
      <Grid
        item
        md={6}
        xs={12}
        sx={{
          marginTop: '20px',
          fontFamily: 'Open Sans',
          color: '#fff',
          fontStyle: 'normal',
          fontSize: '13px',
          padding: '20px, 10px',
          textAlign: 'center',

        }}
      >
        {content}
      </Grid>
      <Grid item xs={12}>
        <button
          type="button"
          className={styles.button}
          // onClick={() => {
          //   consented(flowState);
          //   consent(tabsState);
          // }}
        >
          <div className={styles.consent}>consent</div>
        </button>
      </Grid>
    </Grid>
  );
}

export default ConsentComponentBox;
