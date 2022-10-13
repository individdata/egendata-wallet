/* eslint-disable react/jsx-props-no-spreading */
import { Container, Grid } from '@mui/material';
import React from 'react';
import { useRouter, NextRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import RequestList from '../../components/RequestList/RequestList';
import MenuBar from '../../components/MenuBar/MenuBar';

function HomePage() {
  const { data: session, status } = useSession();
  const router: NextRouter = useRouter();
  const dispatch = useDispatch();

  const onRequestSelect = (uuid: string) => {
    router.push(`/request/${uuid}`);
  };

  console.log(session);

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

  // useEffect(() => {
  //   if (!session?.storage) return;

  //   console.warn('Syncing state from pod');
  //   dispatch<any>(syncStateFromPod(session.storage));

  // }, [session?.storage]);

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
