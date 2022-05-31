/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router';
import { RootState } from '../../store';
import styles from './index.module.css';
import FlowBox from '../../components/flowBox';
import Header from '../../components/header';
import { Title, Steps } from './utils';
import { getRequestsContent } from '../../slices/requestsSlice';
import ConsentBox from '../../components/consentBox';
import { subjectRequestThunks } from '../../slices/requests/subjectRequestsSlice';

function RequestPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const storage = useSelector((state: RootState) => state.auth.user?.storage);

  if (!id) {
    return <Navigate to="/home" replace />;
  }
  const requestState = useSelector((state: RootState) => state.requests[id]);
  const subjectRequestState = useSelector((state: RootState) => state.subjectRequests);

  useEffect(() => {
    dispatch(getRequestsContent());
    if (user) {
      dispatch(subjectRequestThunks.getContent(storage ?? ''));
    }
  }, [user]);

  const redirectState = true;
  if (subjectRequestState) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <div className={styles.main}>
            <Header redirect={redirectState} />
            <div className={styles.body}>
              <div className={styles.title}>
                <Title />
              </div>
              <div className={styles.flowBox}>
                <FlowBox />
              </div>
              <div className={styles.step}>
                <Steps status={requestState.status} />
              </div>
              <div className={styles.consentBox}>
                <ConsentBox />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }

  return <div>Loading...</div>;
}

export default RequestPage;
