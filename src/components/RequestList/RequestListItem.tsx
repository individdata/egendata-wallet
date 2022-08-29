/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid } from '@mui/material';
import React from 'react';
import { SubjectRequest } from '../../store/slices/requests/subjectRequestsSlice';
import useWindowDimensions from '../../hooks/useWindowDimension';
import styles from './RequestListItem.module.css';

type Props = {
  request: SubjectRequest,
  onClick: (request: SubjectRequest) => void,
  dot?: boolean,
};

function RequestListItem({ request, onClick, dot }: Props) {
  const { width } = useWindowDimensions();
  const renderedDot = dot ? (
    <div className={styles.dot} />
  ) : undefined;
  const date = request.created.substring(0, 10);
  return (
    <button
      className={styles.button}
      type="button"
      onClick={() => onClick(request)}
    >
      <Grid container spacing={0.5} columns={12}>
        <Grid item xs={2}>
          <div className={styles.logo}>
            ?
          </div>
        </Grid>
        {(width > 576) && (
          <Grid item xs={2} className={styles.requestor}>
            Requestor
          </Grid>
        )}
        <Grid item xs={8} spacing={2} columns={16} className={(width > 576) ? styles.flex : styles.inline}>
          <Grid item xs={12} md={18} className={styles.label}>
            {renderedDot}
            <div className={styles.text}>
              {request.purpose}
            </div>
          </Grid>
          <Grid item xs={6} md={12} className={styles.date}>
            {date}
          </Grid>
        </Grid>
      </Grid>
    </button>
  );
}

RequestListItem.defaultProps = {
  dot: false,
};

export default RequestListItem;
