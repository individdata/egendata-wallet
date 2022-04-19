import Grid from '@mui/material/Grid';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import ConsentComponentBox from '../consentComponentBox';
import styles from './index.module.css';

export interface RequestType {
  name: string,
  brief: string,
  date: string,
  content: string,
  readstatus: boolean
}

function RequestConsent(props: RequestType) {
  const { content } = props;
  const flowState = useSelector((state: RootState) => state.flow.flow);
  return (

    <div className={(flowState === 'checking') ? styles.requestContent1 : styles.requestContent2}>
      <Grid container>
        <Grid item md={12}>
          <ConsentComponentBox content={content} />
        </Grid>
      </Grid>

    </div>
  );
}

export default RequestConsent;
