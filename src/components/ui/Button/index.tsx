/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.css';

interface ButtonProps {
  onPress: any,
  id: string,
  disabled?: boolean,
  type: 'primary' | 'secondary',
}

function Button(props: ButtonProps) {
  const {
    onPress,
    id,
    disabled,
    type,
  } = props;

  return (
    <div className={styles.line}>
      <button
        type="button"
        className={`${styles.button} ${styles[type]}`}
        onClick={() => onPress()}
        disabled={disabled}
      >
        <FormattedMessage id={id} />
      </button>
    </div>
  );
}

Button.defaultProps = {
  disabled: false,
};

export default Button;
