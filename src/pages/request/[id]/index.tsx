/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
// import { useIntl } from 'react-intl';
// import { Navigate } from 'react-router';
import { useSession } from 'next-auth/react';
import { RootState } from '../../../store/store';
import Stepper from '../../../components/Stepper';
import ProcessDocument from '../../../components/ProcessDocument';
import MenuBar from '../../../components/MenuBar/MenuBar';
import FetchingInProgressDialog from '../../../components/Dialog/FetchingInProgressDialog';
import ShareConsentDialog from '../../../components/Dialog/ConsentDialog';

function RequestPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [state, setState] = useState('received');
  const [error, setError] = useState(false);
  const [showFetchingModal, setShowFetchingModal] = useState(false);
  const [showConsentModal, setConsentModal] = useState(false);

  const { id, redirect } = router.query;

  const handleGetClick = () => {
    setShowFetchingModal(true);
    fetch(`/api/request/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_state: 'fetching' }),
    }).then(
      (success) => console.log('Success!', success),
      (error) => console.log('error', error),
    );
  };

  const handleConsentClick = () => {
    fetch(`/api/request/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ new_state: 'sharing' }),
    })
      .then((result) => result.json())
      .then((success) => console.log('Success!'));
  };

  const handleShowConsentClick = () => {
    setConsentModal(true);
  };

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

            {showFetchingModal && <FetchingInProgressDialog requestState={state} error={error} />}
            {showConsentModal && <ShareConsentDialog onConsent={handleConsentClick} />}
          </Grid>
        </Grid>
      </main>
    </Container>
  );
}

export default RequestPage;
