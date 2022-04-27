import React from 'react';
import styles from './index.module.css';

interface ButtonProps {
  onPress: any,
  label: string,
}

function Button(props: ButtonProps) {
  const { onPress, label } = props;
  return (
    <div className={styles.line}>
      <button
        type="button"
        className={styles.button}
        onClick={() => onPress()}
      >
        <div className={styles.buttonText}>{label}</div>
      </button>
    </div>
  );
}

export default Button;
