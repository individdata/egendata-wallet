import React from 'react';
import { Grid } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';
import styles from './PopupButtons.module.css';
import popupStyles from './Popup.module.css';
import Button from '../ui/Button';

export type PopupButton = {
  uuid: string,
  type: 'primary' | 'secondary',
  message: string,
  disabled?: boolean,
  onPress: () => void,
};

type Props = {
  buttons: PopupButton[],
};

function PopupButtons(props: Props) {
  const { buttons } = props;

  const intl = useIntl();

  const cols = buttons.length === 2 ? 6 : 12;

  const renderedButtons = buttons.map((button) => (
    <Grid key={button.uuid} item xs={12} sm={cols}>
      <Button preset="medium" type={button.type} onPress={button.onPress} disabled={button.disabled}>
        {button.message}
      </Button>
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className={popupStyles.divider} />
      </Grid>
      <Grid item className={styles.buttons} xs={12}>
        <Grid container className={styles.buttonContainer} spacing={2}>
          {renderedButtons}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PopupButtons;
