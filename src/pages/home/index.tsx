/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router';
import { useRouter, NextRouter } from "next/router";
// import { getRequestsContent } from '../../slices/requestsSlice';
import Header from '../../components/header';
import styles from './index.module.css';
import RequestList from '../../components/RequestList/RequestList';
import { SubjectRequest } from '../../store/slices/requests/subjectRequestsSlice';
import Layout from '../../components/layout';
import { useSession, getSession } from 'next-auth/react';
import { syncStateFromPod } from '../../store/slices/processesSlice';
import { useDispatch } from 'react-redux';
import { useSWR } from 'swr';
import { fetchPrivateData, fetchProfileData } from '../../util/oak/solid';


function HomePage() {
  const {data: session, status} = useSession();
  const router: NextRouter = useRouter();
  const dispatch = useDispatch();

  const onRequestSelect = (request: SubjectRequest) => {
    router.push(`/request/${request.id}`);
  };

  console.log(session)

  /*
  useEffect(() => {
    console.log("Hello from effect.", session)

    if (session?.storage) {
      const data = fetchPrivateData(session.storage)
      .then(
        (data) => console.log("Response:", data),
        (error) => console.error(error)
      );
    }
  }, [session])
  */

  useEffect(() => {
    if (!session?.storage) return;

    console.warn('Syncing state from pod');
    dispatch<any>(syncStateFromPod(session.storage));

  }, [session?.storage]);
  
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
                <span style={{color: 'deeppink'}}>
                  {status}
                </span>
              </div>
            </div>
          </Grid>

          <span style={{color: 'deeppink'}}>
            Logged in as: {session?.webid}
          </span>

          <RequestList onRequestSelect={onRequestSelect} />
        </main>
      </Grid>
    </Layout>
  );
}

export default HomePage;
