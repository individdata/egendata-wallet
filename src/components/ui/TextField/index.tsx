import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { v4 as uuid } from 'uuid';
import { faEnvelope, faContactBook } from '@fortawesome/free-regular-svg-icons';
import styles from './index.module.css';

interface TextFieldProps {
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void,
  disabled?: boolean,
  placeholder?: string,
  type: string,
}

function TextField(props: TextFieldProps) {
  const {
    onChange,
    disabled,
    type,
    placeholder,
  } = props;

  const inputId = `textfield-${uuid()}`;

  let icon;
  switch (type) {
    case 'email':
      icon = faEnvelope;
      break;
    case 'phone':
      icon = faContactBook;
      break;
    default:
      icon = undefined;
  }

  return (
    <Grid container className={styles.container}>
      <Grid item xs={12} className={styles.item}>
        {icon && <FontAwesomeIcon icon={icon} fontSize="24" className={styles.icon} />}
        <input
          className={styles.input}
          type="text"
          id={inputId}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(evt) => {
            if (onChange) {
              onChange(evt);
            }
          }}
        />
      </Grid>
    </Grid>
  );
}

TextField.defaultProps = {
  onChange: undefined,
  disabled: false,
  placeholder: undefined,
};

export default TextField;
