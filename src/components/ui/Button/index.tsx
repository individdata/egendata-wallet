/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styles from './index.module.css';

interface ButtonProps {
  onPress: any,
  label: string,
  disabled?: boolean,
  type: 'primary' | 'secondary',
}

function Button(props: ButtonProps) {
  const {
    onPress,
    label,
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
        {label}
      </button>
    </div>
  );
}

Button.defaultProps = {
  disabled: false,
};

export default Button;
