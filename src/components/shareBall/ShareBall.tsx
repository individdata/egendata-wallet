import React from 'react';
import Grid from '@mui/material/Grid';
import styles from '../requestBluebtnCard/index.module.css';

function ShareBall() {
  return (
    <Grid
      md={4}
      xs={12}
      className={styles.text}
      style={{ display: 'flex', flexDirection: 'column', padding: '15px' }}
    >
      <span
        className="fa-stack fa-3x"
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <i
          className="fa-solid fa-circle"
          style={{
            color: 'rgba(255,255,255, 0.2)',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <strong
            className="fa-stack-1x calendar-text"
            style={{ color: 'white', fontSize: '12px' }}
          >
            2
          </strong>
        </i>
      </span>
      Share your data
    </Grid>
  );
}

export default ShareBall;
