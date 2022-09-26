import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Grid } from '@mui/material';
import { unsetPopupData } from '../../../store/slices/popupSlice';
import styles from './ShareComplete.module.css';
import PopupButtons, { PopupButton } from '../PopupButtons';
import PopupContent from '../PopupContent';
import TextField from '../../ui/TextField';

type Props = {
  requestId: string,
};

function ShareComplete(props: Props) {
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
            <FormattedMessage id="popup_success_share_title" />
          </div>
          <div className={styles.noteText}>
            <FormattedMessage id="popup_success_share_subtitle" />
          </div>
          <div className={styles.ctaText}>
            <FormattedMessage id="popup_success_share_description" />
          </div>
          <div className={styles.noteText}>
            <FormattedMessage id="popup_success_share_sub_description" />
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
