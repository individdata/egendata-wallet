/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Navigate } from 'react-router';
import { RootState } from '../../store';
import FlowBox from '../../components/flowBox';
import ProcessDocument from '../../components/ProcessDocument';
import { getProcessByRequestId } from '../../util/oak/egendata';
import MenuBar from '../../components/MenuBar/MenuBar';

function RequestPage() {
  const { id } = useParams();
  const rootState = useSelector((state: RootState) => state);
  const intl = useIntl();

  if (!id) {
    return <Navigate to="/home" replace />;
  }

  const resourceKey = id;
  const subjectRequest = useSelector((state: RootState) => state.subjectRequests.items[resourceKey]);
  const data = useSelector((state: RootState) => state.data.items[resourceKey]);
  const processState = getProcessByRequestId(rootState, resourceKey);

  if (subjectRequest && processState) {
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
                {intl.formatMessage({ id: 'share_document_text' }, {
                  documentTitle: 'Unemployment Certificate',
                  receiver: 'BNP Paribas',
                })}
              </Typography>

              <FlowBox requestId={resourceKey} />

              <Typography
                variant="h6"
                component="h3"
                color="textPrimary"
                textAlign="center"
                marginTop={3}
                marginBottom={1}
              >
                {intl.formatMessage({
                  id: (data && data.document) ? 'second_view_and_share_your_document_text' : 'first_get_your_document_text',
                })}
              </Typography>

              <ProcessDocument requestId={id} />

            </Grid>
          </Grid>
        </main>
      </Container>
    );
  }

  return <div>Loading...</div>;
}

export default RequestPage;
