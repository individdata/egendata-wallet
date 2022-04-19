import React from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import LogoComponent from '../logoComponent/index';
// import TextComponentName from './TextComponent';
// import TextComponentBrief from './TextComponentBrief';
import styles from './index.module.css';
import { RootState } from '../../store';
import { consent } from '../../pages/direct/home/flowSlice';
import TextComponentName from '../textComponentName';
import TextComponentBrief from '../textComponentBrief';
import TextComponentDate from '../textComponentDate';

export interface RequestType {
  name: string;
  brief: string;
  content: string;
  date: string;
}

function RequestItemBlueBtn(props: RequestType) {
  const flowState = useSelector((state: RootState) => state.flow.flow);
  const dispatch = useDispatch();
  const handleClick = flowState === 'uncheck'
    ? () => dispatch(consent('checking'))
    : () => dispatch(consent('consenting'));

  const { name, date, brief } = props;
  console.log(name, date, brief);
  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <button
          type="button"
          className={
            flowState === 'uncheck' || flowState === 'checking'
              ? styles.requestBoxItem1
              : styles.requestBoxItem2
          }
          onClick={handleClick}
          style={{
            width: '100%',
            paddingTop: '10px',
            marginTop: '35px',
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              backgroundColor: 'transparent',
              borderRadius: '36px',
            }}
          >
            <Grid className={styles.center} item xs={12} md={1}>
              <LogoComponent />
            </Grid>

            <Grid className={styles.center} item xs={12} md={3}>
              <TextComponentName brief={brief} name={name} />
            </Grid>
            <Grid className={styles.center} item xs={12} md={5}>
              <TextComponentBrief brief={brief} />
            </Grid>
            <Grid className={styles.center} item xs={12} md={3}>
              <TextComponentDate date={date} />
            </Grid>
          </Grid>
        </button>
      </Grid>
    </Grid>
  );
}

export default RequestItemBlueBtn;
