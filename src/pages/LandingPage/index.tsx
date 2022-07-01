/* eslint-disable */
import { Grid } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import styles from './index.module.css';
import Button from '../../components/ui/Button';
import { doLogin } from '../../slices/authSlice';
import FlowBox from '../../components/flowBox';
import OakLogo from '../../components/header/oakLogo';

function LandingPage() {
  const dispatch = useDispatch();
  const intl = useIntl();
  const url = new URL(window.location.href);
  const currentPath = url.pathname + url.search;
  const request = url.searchParams.get('request');

  return (
    <Grid container className={styles.container}>
      {request && <Grid item xs={12} sm={10} md={8} lg={6} className={styles.right}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, paddingTop: 16 }}>
          <OakLogo />
        </div>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div>{intl.formatMessage({ id: 'landingpage_title' })} <strong>BNP Paribas</strong></div>
            </Grid>
            <Grid item xs={12}>
              <FlowBox requestId={request} />
            </Grid>
            <Grid item xs={12}>
              <strong>{intl.formatMessage({ id: 'landingpage_line1' })}</strong>
              <div style={{ color: 'grey' }}>{intl.formatMessage({ id: 'landingpage_line2' })}</div>
            </Grid>
            <Grid item xs={12}>
              <a href="http://w3schools.com">{intl.formatMessage({ id: 'landingpage_link' })}</a>
            </Grid>
            <Grid item xs={12}>
              <Button preset='medium' type="primary" onPress={() => dispatch(doLogin(currentPath))}>
                {intl.formatMessage({ id: 'login_button' })}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {intl.formatMessage({ id: 'landingpage_footer' })}
            </Grid>
          </Grid>
        </div>
      </Grid>}
      {!request && <>
        <Grid item xs={12} md={6} className={styles.left}>
          <div>
            <img className={styles.logo} alt="left-logo" />
            <div className={styles.title}>{ intl.formatMessage({ id: 'image_page_title' }) }</div>
            <div className={styles.subtitle}>{ intl.formatMessage({ id: 'image_page_description' }) }</div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={styles.right}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, paddingTop: 16 }}>
            <OakLogo />
          </div>
          <div>
            <p className={styles.loginTitle}>
              { intl.formatMessage({ id: 'log_in_text' }) }
            </p>
            <Button
              preset="medium"
              type="primary"
              onPress={() => dispatch(doLogin(currentPath))}
            >
              {intl.formatMessage({ id: 'login_button' })}
            </Button>
            <div className={styles.line}>
              <a href="http://w3schools.com" className={styles.link}>
                { intl.formatMessage({ id: 'home_page_link' }) }
              </a>
            </div>
          </div>
        </Grid>
      </>}
    </Grid>
  );
}

export default LandingPage;
