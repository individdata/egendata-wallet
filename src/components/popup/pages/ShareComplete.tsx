import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Grid } from '@mui/material';
import { unsetPopupData } from '../../../slices/popupSlice';
import styles from './ShareComplete.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';
import TextField from '../../ui/TextField';

type Props = {
  requestId: string,
};

function ShareComplete(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { requestId } = props;

  const dispatch = useDispatch();

  const buttons: PopupButton[] = [
    {
      uuid: uuid(),
      type: 'primary',
      id: 'return_to_requesting_service_button',
      onPress: () => {
        dispatch(unsetPopupData());
      },
    },
  ];

  return (
    <div className={styles.container}>
      <PopupContent>
        <div className={styles.content}>
          <img className={styles.logoSuccess} alt="Success logo" />
          <div className={styles.titleText}>
            Your unemployement certificate is now being shared with BNP Paribas.
          </div>
          <div className={styles.noteText}>
            You can always revoke your consent under Consents.
          </div>
          <div className={styles.ctaText}>
            Stay up to date on all your data matters.
          </div>
          <div className={styles.noteText}>
            Just enter your Email address
          </div>
          <Grid container spacing={1} className={styles.formContainer}>
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField type="email" placeholder="example@email.com" />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="phone" placeholder="telephone number" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </PopupContent>
      <PopupButtons buttons={buttons} />
    </div>
  );
}

export default ShareComplete;
