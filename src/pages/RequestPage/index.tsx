/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router';
import { RootState } from '../../store';
import styles from './index.module.css';
import FlowBox from '../../components/flowBox';
import Header from '../../components/header';
import { Title, Steps } from './utils';
// import { getRequestsContent } from '../../slices/requestsSlice';
import ConsentBox from '../../components/consentBox';

function RequestPage() {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/home" replace />;
  }
  const resourceKey = id;
  console.log(`resourceKey: ${resourceKey}`);
  const subjectRequest = useSelector((state: RootState) => state.subjectRequests.items[resourceKey]);
  console.log(`subjectRequest: ${subjectRequest}`);
  const processState = useSelector((state: RootState) => state.process[id]);
  console.log(`processState: ${processState}`);

  if (subjectRequest && processState) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <div className={styles.main}>
            <Header />
            <div className={styles.body}>
              <div className={styles.title}>
                <Title />
              </div>
              <div className={styles.flowBox}>
                <FlowBox />
              </div>
              <div className={styles.step}>
                <Steps state={processState.state} />
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
