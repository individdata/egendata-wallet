/* eslint-disable react/jsx-props-no-spreading */
import { Container, Grid } from '@mui/material';
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
import { fetchPrivateData, fetchProfileData } from '../../util/oak/solid';
import MenuBar from '../../components/MenuBar/MenuBar';


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
    <Container>
      <MenuBar />
      <main>
      <Grid container sx={{ justifyContent: 'center', backgroundColor: '#222429' }}>
          <RequestList onRequestSelect={onRequestSelect} />
        </Grid>
      </main>
    </Container>
  );
}

export default HomePage;
