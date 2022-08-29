/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React from 'react';
// import { useNavigate } from 'react-router';
import { useRouter, NextRouter } from "next/router";
// import { getRequestsContent } from '../../slices/requestsSlice';
import Header from '../../components/header';
import styles from './index.module.css';
import RequestList from '../../components/RequestList/RequestList';
import { SubjectRequest } from '../../store/slices/requests/subjectRequestsSlice';
import Layout from '../../components/layout';

function HomePage() {
  const nextRouter: NextRouter = useRouter();

  const onRequestSelect = (request: SubjectRequest) => {
    nextRouter.push(`/request/${request.id}`);
  };

  return (
    <Layout>
      <Grid container sx={{ justifyContent: 'center', backgroundColor: '#222429' }}>
        <header>
          <Grid item xs={12}>
            <Header />
          </Grid>
        </header>
        <main>
          <Grid item xs={12}>
            <div className={styles.main}>
              <div className={styles.body}>
                <RequestList onRequestSelect={onRequestSelect} />
              </div>
            </div>
          </Grid>
        </main>
      </Grid>
    </Layout>
  );
}

export default HomePage;
