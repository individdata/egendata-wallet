/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from '@mui/material';
import React from 'react';
import { SubjectRequest } from '../../slices/requests/subjectRequestsSlice';
import styles from './RequestListItem.module.css';

type Props = {
  request: SubjectRequest,
  onClick: (request: SubjectRequest) => void,
};

function RequestListItem({ request, onClick }: Props) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={() => onClick(request)}
    >
      <Grid container>
        <Grid item xs={1}>
          <div className={styles.logo}>
            ?
          </div>
        </Grid>
        <Grid item xs={3} className={styles.requestor}>
          Requestor
        </Grid>
        <Grid item xs={5} className={styles.label}>
          {request.purpose}
        </Grid>
        <Grid item xs={3} className={styles.date}>
          2022-01-01
        </Grid>
      </Grid>
    </button>
  );
}

export default RequestListItem;
