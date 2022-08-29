/* eslint-disable jsx-a11y/label-has-associated-control */
import { Grid } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { v4 as uuid } from 'uuid';
import styles from './index.module.css';

interface CheckboxProps {
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void,
  id: string,
  checked?: boolean,
  disabled?: boolean,
}

function Checkbox(props: CheckboxProps) {
  const {
    onChange,
    id,
    checked,
    disabled,
  } = props;

  const [isChecked, setChecked] = useState(checked);

  const inputId = `checkbox-${uuid()}`;
  return (
    <Grid container className={styles.container}>
      <Grid item xs={12} className={styles.item}>
        <input
          id={inputId}
          className={styles.checkbox}
          type="checkbox"
          onChange={(evt) => {
            setChecked(evt.target.checked);
            if (onChange) {
              onChange(evt);
            }
          }}
          checked={isChecked}
          disabled={disabled}
        />
        <label htmlFor={inputId}>
          <div className={styles.label}>
            <FormattedMessage id={id} />
          </div>
        </label>
      </Grid>
    </Grid>
  );
}

Checkbox.defaultProps = {
  onChange: undefined,
  checked: false,
  disabled: false,
};

export default Checkbox;
