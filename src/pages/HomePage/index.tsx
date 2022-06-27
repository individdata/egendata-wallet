/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
// import { getRequestsContent } from '../../slices/requestsSlice';
import Header from '../../components/header';
import styles from './index.module.css';
import RequestList from '../../components/RequestList/RequestList';
import { SubjectRequest } from '../../slices/requests/subjectRequestsSlice';

function HomePage() {
  const navigate = useNavigate();

  const onRequestSelect = (request: SubjectRequest) => {
    navigate(`/request/${request.id}`);
  };

  return (
    <Grid container sx={{ justifyContent: 'center', backgroundColor: '#222429' }}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <div className={styles.main}>
          <div className={styles.body}>
            <RequestList onRequestSelect={onRequestSelect} />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default HomePage;
