import React from 'react';
import { Grid } from '@mui/material';
import styles from './PopupButtons.module.css';
import popupStyles from './Popup.module.css';
import Button from '../ui/Button';

type PopupButton = {
  uuid: string,
  type: 'primary' | 'secondary',
  label: string,
  disabled?: boolean,
  onPress: () => void,
};

type Props = {
  buttons: PopupButton[],
};

function PopupButtons(props: Props) {
  const { buttons } = props;

  const cols = buttons.length === 2 ? 6 : 12;

  const renderedButtons = buttons.map((button) => (
    <Grid key={button.uuid} item xs={12} sm={cols}>
      <Button type={button.type} label={button.label} onPress={button.onPress} disabled={button.disabled} />
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
