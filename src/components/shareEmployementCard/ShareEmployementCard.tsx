import React from 'react';
import Grid from '@mui/material/Grid';
import { AiOutlineFileText } from 'react-icons/ai';
import { ImArrowUpRight2 } from 'react-icons/im';
import styles from './index.module.css';

function ShareEmployementCard() {
  return (
    <div className={styles.box}>

      <Grid
        container
        sx={{
          backgroundColor: 'black',
          borderRadius: '10px',
          padding: '10px',

        }}
      >
        <Grid item md={6} xs={12}>
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
          }}
          >

            <Grid container>
              {/* <h2 style={{ color: 'white' }}>logo</h2> */}
              <AiOutlineFileText id={styles.file} size={40} />
              <h2
                style={{
                  display: 'flex',
                  color: 'white',
                  fontSize: '16px',
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Unemployment certificate
              </h2>
              {/* logo */}
              {/* employedmenbt text */}
            </Grid>
            <Grid container>
              <h2
                style={{
                  display: 'flex',
                  color: 'white',
                  fontSize: '16px',
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  //   marginRight: '15px',
                  margin: 'auto',
                }}
              >
                Get from:
              </h2>
              <h2
                style={{
                  display: 'flex',
                  color: '#65D36E',
                  fontSize: '16px',
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                // marginLeft: '15px',
                }}
              >
                Arbetsförmedligen
              </h2>
            </Grid>
          </div>
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto', marginTop: '20px',
          }}
        >
          <button
            className={styles.button}
            style={{
              border: '2px solid #65D36E ',
              padding: '9px',
              display: 'flex',
              flexDirection: 'row',

            }}
            type="button"
          >

            <h2 style={{
              color: '#65D36E',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              marginRight: '15px',
            }}
            >
              Get Data

            </h2>
            <ImArrowUpRight2 id={styles.topRight} />
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

export default ShareEmployementCard;
