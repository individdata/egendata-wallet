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
import ProcessDocument from '../../components/ProcessDocument';
import { getProcessByRequestId } from '../../util/oak/egendata';

function RequestPage() {
  const { id } = useParams();
  const rootState = useSelector((state: RootState) => state);

  if (!id) {
    return <Navigate to="/home" replace />;
  }
  const resourceKey = id;
  console.log(`resourceKey: ${resourceKey}`);
  const subjectRequest = useSelector((state: RootState) => state.subjectRequests.items[resourceKey]);
  const data = useSelector((state: RootState) => state.data.items[id]);
  console.log(`subjectRequest: ${subjectRequest}`);
  const processState = getProcessByRequestId(rootState, id);
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
                <Steps state={(data && data.document) ? 'available' : 'received'} />
              </div>
              <div className={styles.processDocumentContainer}>
                <ProcessDocument />
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
