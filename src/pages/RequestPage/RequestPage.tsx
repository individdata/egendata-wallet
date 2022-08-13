/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Navigate } from 'react-router';
import { RootState } from '../../store';
import styles from './RequestPage.module.css';
import FlowBox from '../../components/flowBox';
import Header from '../../components/header';
import ProcessDocument from '../../components/ProcessDocument';
import { getProcessByRequestId } from '../../util/oak/egendata';
import Layout from '../Layout';

function RequestPage() {
  const { id } = useParams();
  const rootState = useSelector((state: RootState) => state);
  const intl = useIntl();

  if (!id) {
    return <Navigate to="/home" replace />;
  }
  const resourceKey = id;
  const subjectRequest = useSelector((state: RootState) => state.subjectRequests.items[resourceKey]);
  const data = useSelector((state: RootState) => state.data.items[id]);
  const processState = getProcessByRequestId(rootState, id);

  if (subjectRequest && processState) {
    return (
      <Layout>
        <Grid className={styles.container} sx={{ justifyContent: 'center', backgroundColor: '#222429' }}>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <div className={styles.main}>
              <header>
                <Header />
              </header>
              <main>
                <div className={styles.body}>
                  <h2 className={styles.title}>
                    {intl.formatMessage({ id: 'share_document_text' }, {
                      documentTitle: 'Unemployment Certificate',
                      receiver: 'BNP Paribas',
                    })}
                  </h2>
                  <div className={styles.flowBox}>
                    <FlowBox requestId={id} />
                  </div>
                  <h4 className={styles.step}>
                    {intl.formatMessage({
                      id: (data && data.document) ? 'second_view_and_share_your_document_text' : 'first_get_your_document_text',
                    })}
                  </h4>
                  <div className={styles.processDocumentContainer}>
                    <ProcessDocument requestId={id} />
                  </div>
                </div>
              </main>
            </div>
          </Grid>
        </Grid>
      </Layout>
    );
  }

  return <div>Loading...</div>;
}

export default RequestPage;
