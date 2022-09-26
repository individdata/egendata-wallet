import React from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './index.module.css';

type Preset = 'small' | 'medium' | 'large';

type Props = {
  preset: Preset,
  onPress: any,
  disabled?: boolean,
  type: 'primary' | 'secondary',
  children: React.ReactNode,
  iconRight?: React.ReactNode | undefined,
};

function Button({
  preset,
  onPress,
  disabled,
  type,
  children,
  iconRight,
}: Props) {
  return (
    <div className={styles.line}>
      <button
        type="button"
        className={`${styles.button} ${styles[preset]} ${styles[type]}`}
        onClick={() => onPress()}
        disabled={disabled}
      >
        <div className={styles.childrenContainer}>
          {children}
        </div>
        { iconRight && (
          <div className={styles.icon}>
            {iconRight}
          </div>
        )}
      </button>
    </div>
  );
}

Button.defaultProps = {
  disabled: false,
  iconRight: undefined,
};

export default Button;
