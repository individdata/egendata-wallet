import React from 'react';
import styles from './index.module.css';

type Props = {
  children: React.ReactNode,
};

function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
