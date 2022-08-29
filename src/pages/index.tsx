import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl, IntlProvider } from 'react-intl';
import LOCALES from '../react-intl/locales';

import Layout from "../components/layout";
import styles from './index.module.css'
import OakLogo from '../components/header/oakLogo';
import FlowBox from '../components/flowBox';
import Button from '../components/ui/Button';
import { doLogin } from '../store/slices/authSlice';
import { RootState } from '../store/store';
import { useRouter, NextRouter } from "next/router";

const NewHome: NextPage = () => {
  const router: NextRouter = useRouter();
  
  const dispatch = useDispatch();
  const intl = useIntl();
  const currentPath = router.asPath;
  const { request } = router.query;
  return (<>
    {request && (
      <Layout>
        <Grid container className={styles.container}>
          <Grid item xs={12} className={styles.right}>
            <header>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, paddingTop: 16 }}>
                <OakLogo />
              </div>
            </header>
            <main>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <h2>{intl.formatMessage({ id: 'landingpage_title' })} <strong>BNP Paribas</strong></h2>
                </Grid>
                <Grid item xs={12}>
                  <FlowBox requestId={request as string} />
                </Grid>
                <Grid item xs={12}>
                  <h2>{intl.formatMessage({ id: 'landingpage_line1' })}</h2>
                  <h3 style={{ color: 'grey' }}>{intl.formatMessage({ id: 'landingpage_line2' })}</h3>
                </Grid>
                <Grid item xs={12}>
                  <a href="http://w3schools.com">{intl.formatMessage({ id: 'landingpage_link' })}</a>
                </Grid>
                <Grid item xs={12}>
                  <Button preset='medium' type="primary" onPress={() => dispatch<any>(doLogin(currentPath))}>
                    {intl.formatMessage({ id: 'login_button' })}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <h3>
                    {intl.formatMessage({ id: 'landingpage_footer' })}
                  </h3>
                </Grid>
              </Grid>
            </main>
          </Grid>
        </Grid>
      </Layout>
    )}
    {!request && <>
      <Grid container className={styles.container}>
        <Grid item xs={12} md={6} className={styles.left}>
          <article>
            <img className={styles.logo} alt="left-logo" />
            <h1 className={styles.title}>{ intl.formatMessage({ id: 'image_page_title' }) }</h1>
            <h3 className={styles.subtitle}>{ intl.formatMessage({ id: 'image_page_description' }) }</h3>
          </article>
        </Grid>
        <Grid item xs={12} md={6} className={styles.right}>
          <header>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, paddingTop: 16 }}>
              <OakLogo />
            </div>
          </header>
          <main>
            <h3 className={styles.loginTitle}>
              { intl.formatMessage({ id: 'log_in_text' }) }
            </h3>
            <Button
              preset="medium"
              type="primary"
              onPress={() => dispatch<any>(doLogin(currentPath))}
            >
              {intl.formatMessage({ id: 'login_button' })}
            </Button>
            <div className={styles.line}>
              <a href="http://w3schools.com" className={styles.link}>
                { intl.formatMessage({ id: 'home_page_link' }) }
              </a>
            </div>
          </main>
        </Grid>
      </Grid>
    </>}
  </>)
}

const Home: NextPage = () => {
  const lang = useSelector((state: RootState) => state.lang.lang);
  
  return (<>
    <IntlProvider locale={lang} messages={LOCALES[lang]}>
      <NewHome />
    </IntlProvider>
  </>);
}

export default Home
