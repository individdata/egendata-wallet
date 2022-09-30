/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
// import { useIntl } from 'react-intl';
// import { Navigate } from 'react-router';
import { RootState } from '../../../store/store';
import Stepper from '../../../components/Stepper';
import ProcessDocument from '../../../components/ProcessDocument';
import MenuBar from '../../../components/MenuBar/MenuBar';
import { useSession } from 'next-auth/react';

function RequestPage() {
  const rootState = useSelector((state: RootState) => state);
  const { data: session, status } = useSession();
  const router = useRouter()

  const { id } = router.query;

  // const intl = useIntl();
  // useEffect(() => {
  //   if (!id) {
  //     router.push('/home');
  //   }
  // })

  return (
    <Container maxWidth="lg">
      <MenuBar />

      <main>
        <Grid container justifyContent="center">

          <Grid item xs={12} md={10} lg={8} textAlign="center">
            <Typography
              variant="h5"
              component="h2"
              color="textPrimary"
              marginTop={5}
              marginBottom={1}
            >
            </Typography>

            <Stepper requestId={id as string} />

            <Typography
              variant="h6"
              component="h3"
              color="textPrimary"
              textAlign="center"
              marginTop={3}
              marginBottom={1}
            >

            </Typography>

            <ProcessDocument requestId={id as string} />

          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export default RequestPage;
