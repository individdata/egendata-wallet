/* eslint-disable react/jsx-props-no-spreading */
import { Grid } from '@mui/material';
import React from 'react';
import { useRouter, NextRouter } from "next/router";
import Header from '../../components/header';
import styles from './index.module.css';
import RequestList from '../../components/RequestList/RequestList';
import { SubjectRequest } from '../../store/slices/requests/subjectRequestsSlice';
import Layout from '../../components/layout';
import { IntlProvider } from 'react-intl';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import LOCALES from '../../react-intl/locales';

function HomePage() {
  const router: NextRouter = useRouter();
  const lang = useSelector((state: RootState) => state.lang.lang);

  const onRequestSelect = (request: SubjectRequest) => {
    router.push(`/request/${request.id}`);
  };

  return (
    <IntlProvider locale={lang} messages={LOCALES[lang]}>
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
    </IntlProvider>
  );
}

export default HomePage;
