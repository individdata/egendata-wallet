/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Stepper from '../../../components/Stepper';
import ProcessDocument from '../../../components/ProcessDocument';
import MenuBar from '../../../components/MenuBar/MenuBar';
import FetchingInProgressDialog from '../../../components/Dialog/FetchingInProgressDialog';
import ShareConsentDialog from '../../../components/Dialog/ConsentDialog';
import { RequestState } from '../../../types';
import { useSWRConfig } from 'swr';

function RequestPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const [state, setState] = useState<RequestState>('received');
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id, redirect } = router.query;

  const handleGetClick = async () => {
    setState('fetching');
    setError(false);
    setShowModal(true);
    console.log('Handling get click.');
    const response = await fetch(`/api/request/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_state: 'fetching' }),
    });

    if (response.ok) {
      console.log('Success getting data');
      // TODO: Look into what kind of error we have
      setState('available');
    } else {
      console.error('Error getting data', response);
      setError(true);
    }
  };
  const handleShowConsentClick = () => {
    setState('preview');
    setShowModal(true);
  };

  const handleContinueClick = () => {
    setState('consent');
  };

  const handleConsentClick = async () => {
    console.log('Handling consent click');
    setState('sharing');
    setError(false);
    setShowModal(true);
    const response = await fetch(`/api/request/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_state: 'sharing' }),
    });

    if (response.ok) {
      console.log('Success consenting');
      setState('shared');
      mutate(`/api/request/${id}`);
    } else {
      console.error('Error consenting', response);
      // setState('error');
      setError(true);
    }
  };

  useEffect(() => console.log(`State changed to ${state}, (${error ? 'error' : 'noerr'})`), [state, error]);

  return (
    <Container maxWidth="lg">
      <MenuBar disabledNav={redirect === ''} />

      <main>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={6} textAlign="center" paddingTop={8}>
            {id && (
              <>
                <Stepper requestId={id as string} />

                <ProcessDocument
                  requestId={id as string}
                  onGetClick={handleGetClick}
                  onShowConsentClick={handleShowConsentClick}
                />
              </>
            )}

            {showModal && ['received', 'fetching'].includes(state) && (
              <FetchingInProgressDialog state={state} error={error} handleClose={() => setShowModal(false)} />
            )}
            {showModal && ['preview', 'consent', 'sharing'].includes(state) && (
              <ShareConsentDialog
                state={state}
                error={error}
                onContinue={handleContinueClick}
                onConsent={handleConsentClick}
              />
            )}
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export default RequestPage;
