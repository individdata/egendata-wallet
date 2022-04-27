/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router';
import { RootState } from '../../store';
import styles from './index.module.css';
import FlowBox from '../../components/flowBox';
import { getRequestsContent } from '../requests/requestSlice';
import Header from '../../components/header';

function RequestPage() {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/home" replace />;
  }

  const requestState = useSelector((state: RootState) => state.requests[id]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRequestsContent());
    console.log(id);
  }, []);

  const redirectState = true;
  if (requestState) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <div className={styles.main}>
            <Header {...redirectState} />
            <div className={styles.body}>
              <div className={styles.RequestPage}>
                {`RequestPage (id: ${id})`}
                <div>
                  {requestState.content.documentType}
                </div>
              </div>
              <div className={styles.flowBox}>
                <FlowBox />
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
